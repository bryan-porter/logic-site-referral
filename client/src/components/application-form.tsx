import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { getOrCreateVisitorId, getUtmParams, getReferrer } from "@/lib/tracking";
import { useFormState } from "@/contexts/form-state-context";

// Schema for the application form
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  currentRole: z.string().min(2, "Role is required"),
  region: z.string().min(2, "Region is required"),
  relationships: z.string().min(1, "Estimate is required"),
  focus: z.string().min(1, "Please select a focus"),
  availability: z.string().min(1, "Please select availability"),
});

type FormData = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  /** Optional callback when form is successfully submitted */
  onSuccess?: () => void;
  /** Whether to show the form header with title/description */
  showHeader?: boolean;
  /** Custom class name for the form container */
  className?: string;
}

export function ApplicationForm({
  onSuccess,
  showHeader = false,
  className = "",
}: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Get persisted form state
  const { formValues, setFormValues, clearForm } = useFormState();

  // Initialize visitor ID cookie on mount
  useEffect(() => {
    getOrCreateVisitorId();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
    values: formValues, // Controlled mode: sync with context changes
  });

  // Sync form changes to context so they persist when takeover closes
  useEffect(() => {
    const subscription = form.watch((values) => {
      setFormValues(values as FormData);
    });
    return () => subscription.unsubscribe();
  }, [form, setFormValues]);

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Get visitor tracking data
      const visitorId = getOrCreateVisitorId();
      const utmParams = getUtmParams();
      const referrer = getReferrer();

      // Build form data
      const formData = new FormData();
      formData.append("fullName", values.name);
      formData.append("email", values.email);
      formData.append("currentRole", values.currentRole);
      formData.append(
        "relevantExperience",
        `Region: ${values.region}\nProvider Relationships: ${values.relationships}\nFocus: ${values.focus}\nAvailability: ${values.availability}`
      );
      formData.append("roleSlug", "sales-referral-partner");
      formData.append("roleName", "Referral Partner");
      formData.append("source", "referral-partner-landing");

      // Append visitor tracking data
      formData.append("visitor_id", visitorId);
      if (utmParams.utm_source)
        formData.append("utm_source", utmParams.utm_source);
      if (utmParams.utm_medium)
        formData.append("utm_medium", utmParams.utm_medium);
      if (utmParams.utm_campaign)
        formData.append("utm_campaign", utmParams.utm_campaign);
      if (utmParams.utm_content)
        formData.append("utm_content", utmParams.utm_content);
      if (utmParams.utm_term) formData.append("utm_term", utmParams.utm_term);
      if (referrer) formData.append("referrer", referrer);

      const res = await fetch("/api/forms/careers", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Success - clear persisted form state
      setSubmitSuccess(true);
      form.reset();
      clearForm();
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={className}>
      {showHeader && (
        <div className="mb-6">
          <h3 className="text-xl font-bold font-heading text-slate-900">
            Rep Application
          </h3>
          <p className="text-sm text-slate-500 mb-1">
            See if you qualify for the program.
          </p>
          <p className="text-xs text-muted-foreground font-medium text-slate-400">
            Independent contractor. Part-time friendly. Non-exclusive.
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs uppercase font-semibold text-muted-foreground">
                    Full Name
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs uppercase font-semibold text-muted-foreground">
                    Work Email
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="john@company.com"
                      {...field}
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="currentRole"
            render={({ field }) => (
              <FormItem>
                <Label className="text-xs uppercase font-semibold text-muted-foreground">
                  Current Role
                </Label>
                <FormControl>
                  <Input
                    placeholder="e.g. Independent Pharma Rep"
                    {...field}
                    className="bg-background/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs uppercase font-semibold text-muted-foreground">
                    Region
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="e.g. Southeast"
                      {...field}
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="relationships"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-xs uppercase font-semibold text-muted-foreground">
                    Est # Providers Calling On
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="Est. count"
                      {...field}
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="focus"
            render={({ field }) => (
              <FormItem>
                <Label className="text-xs uppercase font-semibold text-muted-foreground">
                  Current Focus
                </Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select primary focus" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pharma">Pharma</SelectItem>
                    <SelectItem value="device">Med Device</SelectItem>
                    <SelectItem value="home_health">Home Health</SelectItem>
                    <SelectItem value="billing">Billing / RCM</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <Label className="text-xs uppercase font-semibold text-muted-foreground">
                  Availability
                </Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="part_time">Part-time</SelectItem>
                    <SelectItem value="full_time">Full-time</SelectItem>
                    <SelectItem value="side_by_side">
                      Side-by-side with current job
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {submitError && (
            <div
              className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md p-3"
              role="alert"
            >
              {submitError}
            </div>
          )}

          {submitSuccess ? (
            <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md p-4 text-center">
              <p className="font-semibold">Application submitted successfully!</p>
              <p className="mt-1">We'll be in touch soon.</p>
            </div>
          ) : (
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold mt-2 shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
