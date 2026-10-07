import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../lib/api';
import type { UserType } from '../types';

const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid work or personal email' })
    .max(150, { message: 'Email cannot exceed 150 characters' }),
  phone: z
    .string()
    .trim()
    .min(7, { message: 'Phone number must be at least 7 digits' })
    .max(20, { message: 'Phone number cannot exceed 20 characters' })
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
      message: 'Please enter a valid phone number (e.g. +91 9876543210)',
    }),
  userType: z.enum(['Student', 'Customer', 'Other'] as const, {
    message: 'Please select a valid user type',
  }),
  interest: z
    .string()
    .trim()
    .min(2, { message: 'Please specify the service or course' })
    .max(150, { message: 'Interest cannot exceed 150 characters' }),
  message: z
    .string()
    .trim()
    .min(5, { message: 'Message must be at least 5 characters long' })
    .max(2000, { message: 'Message cannot exceed 2000 characters' }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [statusBanner, setStatusBanner] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const initialInterest = searchParams.get('interest') || '';
  const initialUserType = (searchParams.get('userType') as UserType) || 'Customer';

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      userType: initialUserType,
      interest: initialInterest,
      message: '',
    },
  });

  useEffect(() => {
    if (initialInterest) {
      setValue('interest', initialInterest);
    }
    if (initialUserType) {
      setValue('userType', initialUserType);
    }
  }, [initialInterest, initialUserType, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setStatusBanner('idle');
    setErrorMessage('');
    try {
      await api.createEnquiry(data);
      setStatusBanner('success');
      reset();
    } catch (err: unknown) {
      setStatusBanner('error');
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Something went wrong. Please try again. Core telemetry service returned timeout error.');
      }
    }
  };

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col w-full bg-canvas">
      <main className="w-full pt-10 sm:pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="space-y-3 max-w-3xl mb-10 pb-8 border-b border-hairline">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-surface-container-lowest border border-hairline text-mute">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-body">
                COMMUNICATION MATRIX // DISPATCH
              </span>
              <span className="text-hairline">|</span>
              <span className="font-mono text-[11px] text-mute uppercase">SECURE INTAKE</span>
            </div>
            <h1 className="text-[32px] sm:text-[42px] md:text-[46px] font-semibold text-ink tracking-tight leading-tight">
              Flight Support &amp; Lead Intake
            </h1>
            <p className="text-[14.5px] sm:text-[15px] text-body max-w-2xl leading-relaxed">
              Connect with our flight operations desk or request academy enrollment details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (Desk + Airspace + FAQ) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Operations Desk Card */}
              <div className="rounded-xl bg-surface-container-lowest p-6 border border-hairline shadow-xs relative">
                <div className="flex items-center justify-between pb-4 border-b border-hairline mb-5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-ink text-[18px]">hub</span>
                    <span className="font-semibold text-[15px] tracking-tight text-ink">
                      Operations Desk
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-low border border-hairline font-mono text-[11px] text-ink uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Relay
                  </span>
                </div>

                <div className="space-y-4 text-[13px]">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-faint text-[17px] mt-0.5">
                      location_on
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
                        Command Base &amp; Hangar
                      </span>
                      <span className="text-ink mt-0.5 font-normal">
                        Sector 09 Aviation Way, Gate 4B, Skyport Matrix, CA 94016
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-faint text-[17px] mt-0.5">
                      schedule
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
                        Clearance Window
                      </span>
                      <span className="text-ink mt-0.5 font-normal">
                        08:00 - 18:00 UTC Daily (Autonomous Dispatch 24/7)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-faint text-[17px] mt-0.5">
                      alternate_email
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
                        Dispatch Signal
                      </span>
                      <span className="text-ink font-mono text-[12px] mt-0.5">
                        ops-telemetry@dronetv-aero.io
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-faint text-[17px] mt-0.5">
                      call
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-mute">
                        Voice Line
                      </span>
                      <span className="text-ink font-mono text-[12px] mt-0.5">
                        +1 (800) 412-AERO [EXT 404]
                      </span>
                    </div>
                  </div>
                </div>

                {/* Urgent Notice */}
                <div className="mt-6 p-3.5 rounded-lg bg-surface-container-low border border-hairline flex items-start gap-3">
                  <span className="material-symbols-outlined text-ink text-[18px] mt-0.5">
                    crisis_alert
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink font-medium">
                      Urgent Flight Support
                    </span>
                    <p className="text-[12px] text-body mt-0.5 leading-normal">
                      Active airborne anomalies or safety interventions bypass intake forms. Hail tactical frequency via priority channel 121.5 MHz or direct hotline.
                    </p>
                  </div>
                </div>
              </div>

              {/* Restricted Airspace Map Card */}
              <div className="rounded-xl bg-surface-container-lowest p-5 border border-hairline shadow-xs relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-ink text-[17px]">radar</span>
                    <span className="font-mono text-[11px] text-ink uppercase tracking-wider font-medium">
                      Restricted Airspace Map
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-mute">
                    LAT 37.7749° N // LON 122.4194° W
                  </span>
                </div>
                <div className="w-full h-44 rounded-lg border border-hairline relative bg-surface-container-low overflow-hidden flex flex-col justify-between p-3.5">
                  <div className="absolute inset-0 opacity-[0.3] bg-[radial-gradient(currentColor_1px,transparent_1px)] text-body [background-size:16px_16px] pointer-events-none"></div>
                  <div className="relative z-10 flex flex-wrap gap-2 pointer-events-none">
                    <span className="px-2 py-0.5 rounded bg-surface-container-lowest/95 border border-hairline font-mono text-[10px] text-ink font-medium shadow-2xs">
                      ZONE-ALPHA (AUTHORIZED)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-lowest/95 border border-hairline font-mono text-[10px] text-red-600 dark:text-red-400 font-medium shadow-2xs">
                      NO-FLY CORRIDOR 12NM
                    </span>
                  </div>
                  <div className="relative z-10 flex items-center justify-end pointer-events-none">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-lowest/95 border border-hairline text-ink shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink"></span>
                      <span className="font-mono text-[10px] font-medium tracking-wider">
                        LZ-MARKER ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flight Ops FAQ */}
              <div className="rounded-xl bg-surface-container-lowest p-6 border border-hairline shadow-xs flex flex-col">
                <div className="flex items-center gap-2 mb-2 pb-3 border-b border-hairline">
                  <span className="material-symbols-outlined text-ink text-[18px]">help_center</span>
                  <span className="font-semibold text-[15px] tracking-tight text-ink">
                    Flight Ops FAQ
                  </span>
                </div>
                <div className="divide-y divide-hairline">
                  <div className="py-3 cursor-pointer group" onClick={() => toggleFaq('faq-1')}>
                    <div className="flex items-center justify-between text-ink group-hover:text-blue-500 transition-colors">
                      <span className="text-[13px] font-medium">
                        What lead time is required for commercial flight permits?
                      </span>
                      <span className="material-symbols-outlined text-mute group-hover:text-ink text-[18px]">
                        {openFaq === 'faq-1' ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    {openFaq === 'faq-1' && (
                      <p className="text-[12px] text-body mt-2 leading-relaxed">
                        Standard Class G airspace operations require 48 hours for automated telemetry validation. Controlled Class B/C operations or BVLOS waivers need 5-10 business days coordinate filing.
                      </p>
                    )}
                  </div>

                  <div className="py-3 cursor-pointer group" onClick={() => toggleFaq('faq-2')}>
                    <div className="flex items-center justify-between text-ink group-hover:text-blue-500 transition-colors">
                      <span className="text-[13px] font-medium">
                        Do you provide equipment for training courses?
                      </span>
                      <span className="material-symbols-outlined text-mute group-hover:text-ink text-[18px]">
                        {openFaq === 'faq-2' ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    {openFaq === 'faq-2' && (
                      <p className="text-[12px] text-body mt-2 leading-relaxed">
                        Yes. Commercial Pilot Academy trainees are assigned dedicated dual-operator telemetry rigs, RTK ground stations, and thermal/LiDaR training payloads for the entire curriculum.
                      </p>
                    )}
                  </div>

                  <div className="py-3 cursor-pointer group" onClick={() => toggleFaq('faq-3')}>
                    <div className="flex items-center justify-between text-ink group-hover:text-blue-500 transition-colors">
                      <span className="text-[13px] font-medium">
                        How are flight logs verified?
                      </span>
                      <span className="material-symbols-outlined text-mute group-hover:text-ink text-[18px]">
                        {openFaq === 'faq-3' ? 'expand_less' : 'expand_more'}
                      </span>
                    </div>
                    {openFaq === 'faq-3' && (
                      <p className="text-[12px] text-body mt-2 leading-relaxed">
                        All telemetry packets stream live to our tamper-evident ledger node with cryptographic signatures recording altitude, battery state, GPS trace, and pilot actions.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Intake Form) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="rounded-xl bg-surface-container-lowest p-6 sm:p-8 border border-hairline shadow-xs flex flex-col gap-6 relative">
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline">
                  <div>
                    <span className="font-mono text-[11px] text-mute uppercase tracking-wider font-medium">
                      INSPECTION &amp; DEMO HUB
                    </span>
                    <h2 className="font-semibold text-[18px] tracking-tight text-ink mt-0.5">
                      Flight Mission Intake
                    </h2>
                  </div>
                  <div className="flex items-center p-0.5 rounded-md bg-surface-container-low border border-hairline gap-0.5 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setStatusBanner('idle')}
                      className={`px-2.5 py-1 rounded text-[12px] font-medium transition-all ${
                        statusBanner === 'idle' ? 'text-ink bg-surface-container-lowest shadow-xs border border-hairline' : 'text-mute'
                      }`}
                    >
                      Default
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusBanner('success')}
                      className={`px-2.5 py-1 rounded text-[12px] font-medium transition-all ${
                        statusBanner === 'success' ? 'text-ink bg-surface-container-lowest shadow-xs border border-hairline' : 'text-mute'
                      }`}
                    >
                      Success
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStatusBanner('error');
                        setErrorMessage('Something went wrong. Please try again. Core telemetry service returned timeout error [ERR_GATEWAY_DROP].');
                      }}
                      className={`px-2.5 py-1 rounded text-[12px] font-medium transition-all ${
                        statusBanner === 'error' ? 'text-ink bg-surface-container-lowest shadow-xs border border-hairline' : 'text-mute'
                      }`}
                    >
                      Error
                    </button>
                  </div>
                </div>

                {/* Success Banner */}
                {statusBanner === 'success' && (
                  <div className="p-4 rounded-lg bg-surface-container-low border border-hairline flex items-start gap-3 animate-in fade-in duration-150">
                    <span className="material-symbols-outlined text-emerald-500 text-[20px] mt-0.5">
                      check_circle
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase text-ink tracking-wider font-semibold">
                        TRANSMISSION CONFIRMED
                      </span>
                      <p className="text-[13px] text-body mt-0.5 leading-normal">
                        Thanks for your enquiry. We'll get back to you soon. Flight ticket #DTV-9921 has been issued to your terminal.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {statusBanner === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-in fade-in duration-150">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[20px] mt-0.5">
                      error
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase text-red-600 dark:text-red-400 tracking-wider font-semibold">
                        PACKET UPLOAD FAILED
                      </span>
                      <p className="text-[13px] text-body mt-0.5 leading-normal">
                        {errorMessage || 'Something went wrong. Please try again. Core telemetry service returned timeout error [ERR_GATEWAY_DROP].'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Intake Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-body">
                        Full Name / Callsign *
                      </label>
                      <input
                        type="text"
                        {...register('name')}
                        placeholder="Capt. Alexander Vance"
                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-low text-[13px] text-ink placeholder:text-mute focus:outline-hidden transition-all ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-hairline focus:border-ink'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] font-mono text-red-600 dark:text-red-400">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-body">
                        Direct Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="vance@aerocorp.io"
                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-low text-[13px] text-ink placeholder:text-mute focus:outline-hidden transition-all ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-hairline focus:border-ink'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] font-mono text-red-600 dark:text-red-400">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-body">
                        Contact Phone / Telemetry *
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        placeholder="+1 (555) 019-2831"
                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-low text-[13px] text-ink placeholder:text-mute focus:outline-hidden transition-all ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-hairline focus:border-ink'
                        }`}
                      />
                      {errors.phone && (
                        <span className="text-[11px] font-mono text-red-600 dark:text-red-400">{errors.phone.message}</span>
                      )}
                    </div>

                    {/* User Type */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[11px] uppercase tracking-wider text-body">
                        Intake Classification *
                      </label>
                      <select
                        {...register('userType')}
                        className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-low text-[13px] text-ink focus:outline-hidden cursor-pointer ${
                          errors.userType ? 'border-red-500' : 'border-hairline focus:border-ink'
                        }`}
                      >
                        <option value="Customer">Enterprise Flight Customer</option>
                        <option value="Student">Flight Academy Cadet / Student</option>
                        <option value="Other">External Partner / Research Org</option>
                      </select>
                      {errors.userType && (
                        <span className="text-[11px] font-mono text-red-600 dark:text-red-400">{errors.userType.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-body">
                      Mission Area / Target Service *
                    </label>
                    <input
                      type="text"
                      {...register('interest')}
                      placeholder="e.g., Critical Infrastructure Inspection or Remote Pilot Certification"
                      className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-low text-[13px] text-ink placeholder:text-mute focus:outline-hidden transition-all ${
                        errors.interest ? 'border-red-500 focus:border-red-500' : 'border-hairline focus:border-ink'
                      }`}
                    />
                    {errors.interest && (
                      <span className="text-[11px] font-mono text-red-600 dark:text-red-400">{errors.interest.message}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-body">
                      Detailed Mission Specification / Objectives *
                    </label>
                    <textarea
                      rows={4}
                      {...register('message')}
                      placeholder="Provide coordinates, flight duration requirements, asset dimensions, sensor payloads..."
                      className={`w-full px-3.5 py-2.5 rounded-lg border bg-surface-container-low text-[13px] text-ink placeholder:text-mute focus:outline-hidden transition-all ${
                        errors.message ? 'border-red-500 focus:border-red-500' : 'border-hairline focus:border-ink'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-[11px] font-mono text-red-600 dark:text-red-400">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-ink text-canvas font-button-md text-[14px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block h-4 w-4 border-2 border-canvas border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Packet...</span>
                      </>
                    ) : (
                      <>
                        <span>Transmit Flight Request</span>
                        <span className="material-symbols-outlined text-[17px]">send</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <span className="material-symbols-outlined text-mute text-[14px]">lock</span>
                    <span className="font-mono text-[11px] text-mute uppercase">
                      END-TO-END TELEMETRY ENCRYPTION // AES-256
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
