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
  name: z.string().optional().or(z.literal("")),
  email: z.string().email("Invalid email address"),
  currentRole: z.string().optional().or(z.literal("")),
  region: z.string().optional().or(z.literal("")),
  relationships: z.string().optional().or(z.literal("")),
  focus: z.string().optional().or(z.literal("")),
  availability: z.string().optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
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
      const publicApiKey = import.meta.env.NEXT_PUBLIC_PUBLIC_API_KEY as
        | string
        | undefined;

      const payload = {
        name: values.name || undefined,
        email: values.email,
        role: values.currentRole || undefined,
        provider_count: values.relationships || undefined,
        form_id: "referral-partner-application",
        segment_slug: "referral-partner",
        visitor_id: visitorId,
        utm_source: utmParams.utm_source || undefined,
        utm_medium: utmParams.utm_medium || undefined,
        utm_campaign: utmParams.utm_campaign || undefined,
        utm_content: utmParams.utm_content || undefined,
        utm_term: utmParams.utm_term || undefined,
        referrer: referrer || undefined,
        message: `Region: ${values.region || "N/A"}\nFocus: ${values.focus || "N/A"}\nAvailability: ${values.availability || "N/A"}\nLinkedIn: ${values.linkedin || "N/A"}`,
        website: "",
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (publicApiKey) {
        headers["x-public-api-key"] = publicApiKey;
      }

      const res = await fetch("/api/forms/lead", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : {};

      if (!res.ok || !data.ok) {
        setSubmitError(
          data.error ||
            data.message ||
            "Something went wrong. Please try again."
        );
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
    <div className={`flex flex-col ${className}`}>
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
                    *Email
                  </Label>
                  <FormControl>
                    <Input
                      placeholder="john@company.com"
                      {...field}
                      required
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

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <Label className="text-xs uppercase font-semibold text-muted-foreground">
                  LinkedIn Profile URL
                </Label>
                <FormControl>
                  <Input
                    placeholder="https://www.linkedin.com/in/yourname"
                    {...field}
                    className="bg-background/50"
                  />
                </FormControl>
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

      {showHeader && (
        <address className="not-italic text-xs text-slate-400 mt-6">
          LOGIC Health Management<br />
          5900 Balcones Dr. Suite 100<br />
          Austin, TX 78731<br />
          Email: partners@ccm-logichm.com
        </address>
      )}
    </div>
  );
}
