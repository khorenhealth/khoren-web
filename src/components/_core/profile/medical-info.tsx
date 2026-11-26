"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { FileText, Info, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ctaPrimaryClassName,
  ctaPrimaryStyle,
} from "@/components/_core/landing-pages/shared/cta-button-styles";
import { cn } from "@/lib/utils";

const totalSteps = 8;
const currentStep = 4;
const maxFileBytes = 10 * 1024 * 1024;

const fieldClassName =
  "h-12 w-full rounded-xl border border-[#E6E8EC] bg-white px-4 text-sm text-healiu-dark-dark outline-none transition-colors placeholder:text-healiu-dark-lighter focus:border-healiu-blue";

type Medication = {
  id: string;
  name: string;
  strength: string;
  frequency: string;
};

type SupportingRecord = {
  id: string;
  name: string;
  kind: string;
  sizeLabel: string;
  url: string | null;
};

const allowedFileTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="absolute -top-2.5 left-3 z-10 bg-white px-1.5 text-xs font-medium text-healiu-dark"
    >
      {children}
    </label>
  );
}

function fileKind(type: string) {
  if (type === "application/pdf") return "PDF";
  if (type === "image/jpeg") return "JPG";
  if (type === "image/png") return "PNG";
  return "File";
}

function fileSizeLabel(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MedicalInfo({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordsRef = useRef<SupportingRecord[]>([]);
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "amoxicillin",
      name: "Amoxicillin",
      strength: "500 mg",
      frequency: "Twice daily",
    },
  ]);
  const [records, setRecords] = useState<SupportingRecord[]>([
    {
      id: "discharge",
      name: "Hospital Discharge Summary",
      kind: "PDF",
      sizeLabel: "842 KB",
      url: null,
    },
    {
      id: "blood-work",
      name: "Pre-op Blood Work Results",
      kind: "PDF",
      sizeLabel: "247 KB",
      url: null,
    },
    {
      id: "procedure-notes",
      name: "Surgical Procedure Notes",
      kind: "PDF",
      sizeLabel: "563 KB",
      url: null,
    },
  ]);
  const [dragging, setDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    recordsRef.current = records;
  }, [records]);

  useEffect(() => {
    return () => {
      recordsRef.current.forEach((record) => {
        if (record.url) URL.revokeObjectURL(record.url);
      });
    };
  }, []);

  function updateMedication(id: string, patch: Partial<Medication>) {
    setMedications((current) =>
      current.map((medication) =>
        medication.id === id ? { ...medication, ...patch } : medication,
      ),
    );
  }

  function addMedication() {
    setMedications((current) => [
      ...current,
      { id: crypto.randomUUID(), name: "", strength: "", frequency: "" },
    ]);
  }

  function removeMedication(id: string) {
    setMedications((current) => current.filter((medication) => medication.id !== id));
  }

  function addFiles(fileList: FileList | File[]) {
    const next: SupportingRecord[] = [];
    const errors: string[] = [];

    Array.from(fileList).forEach((file) => {
      if (!allowedFileTypes.has(file.type)) {
        errors.push(`${file.name} must be a PDF, JPG, or PNG.`);
        return;
      }

      if (file.size > maxFileBytes) {
        errors.push(`${file.name} must be 10 MB or smaller.`);
        return;
      }

      next.push({
        id: crypto.randomUUID(),
        name: file.name.replace(/\.[^.]+$/, ""),
        kind: fileKind(file.type),
        sizeLabel: fileSizeLabel(file.size),
        url: URL.createObjectURL(file),
      });
    });

    setFileError(errors[0] ?? null);
    if (next.length > 0) {
      setRecords((current) => [...current, ...next]);
    }
  }

  function removeRecord(id: string) {
    setRecords((current) => {
      const record = current.find((item) => item.id === id);
      if (record?.url) URL.revokeObjectURL(record.url);
      return current.filter((item) => item.id !== id);
    });
  }

  function viewRecord(record: SupportingRecord) {
    if (!record.url) return;
    window.open(record.url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="my-auto w-full max-w-xl rounded-[1.75rem] bg-white px-6 py-7 shadow-[0_16px_50px_rgba(11,105,201,0.08)] sm:px-8">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold text-healiu-blue sm:text-sm">
          Step {currentStep} of {totalSteps} · Medications & records
        </p>
        <p className="shrink-0 text-xs text-healiu-dark">
          {currentStep - 1} of {totalSteps} steps done
        </p>
      </div>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {Array.from({ length: totalSteps }, (_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full",
              index < currentStep ? "bg-healiu-blue" : "bg-[#E4E7EC]",
            )}
          />
        ))}
      </div>

      <h1 className="mt-5 text-2xl font-bold tracking-tight text-healiu-dark-dark sm:text-[1.75rem]">
        Medications & records
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-healiu-dark">
        Add medicines you currently report taking and any useful documents. This step is
        optional.
      </p>

      <form
        className="mt-6 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          onContinue();
        }}
      >
        <div className="flex gap-3 rounded-xl bg-[#FBF6EA] px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-[#A16207]" strokeWidth={2.25} />
          <div>
            <p className="text-sm font-semibold text-healiu-dark-dark">
              Patient-reported. Care team review needed.
            </p>
            <p className="mt-0.5 text-sm leading-relaxed text-healiu-dark">
              A clinician checks this against your medication allergy. This needs care-team
              review before treatment. Do not stop or change a medicine, or confirm that a
              medicine is safe, unless your care team has reviewed it.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {medications.map((medication) => (
            <div key={medication.id} className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-healiu-dark-dark">
                  Patient-reported medication
                </p>
                <button
                  type="button"
                  onClick={() => removeMedication(medication.id)}
                  className="text-sm font-medium text-healiu-blue hover:underline"
                >
                  Remove medication
                </button>
              </div>

              <div className="relative">
                <FieldLabel htmlFor={`${medication.id}-name`}>Medication name *</FieldLabel>
                <input
                  id={`${medication.id}-name`}
                  name={`${medication.id}-name`}
                  value={medication.name}
                  onChange={(event) =>
                    updateMedication(medication.id, { name: event.target.value })
                  }
                  required
                  className={fieldClassName}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <FieldLabel htmlFor={`${medication.id}-strength`}>
                    Strength / dose reported *
                  </FieldLabel>
                  <input
                    id={`${medication.id}-strength`}
                    name={`${medication.id}-strength`}
                    value={medication.strength}
                    onChange={(event) =>
                      updateMedication(medication.id, { strength: event.target.value })
                    }
                    required
                    className={fieldClassName}
                  />
                </div>
                <div className="relative">
                  <FieldLabel htmlFor={`${medication.id}-frequency`}>
                    Frequency reported *
                  </FieldLabel>
                  <input
                    id={`${medication.id}-frequency`}
                    name={`${medication.id}-frequency`}
                    value={medication.frequency}
                    onChange={(event) =>
                      updateMedication(medication.id, { frequency: event.target.value })
                    }
                    required
                    className={fieldClassName}
                  />
                </div>
              </div>
              <p className="text-xs leading-relaxed text-healiu-dark">
                Patient-reported. Confirm the dose and schedule with your clinician.
              </p>
            </div>
          ))}

          <button
            type="button"
            onClick={addMedication}
            className="text-sm font-medium text-healiu-blue hover:underline"
          >
            + Add another medication
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-healiu-dark-dark">
              Supporting records · Optional
            </p>
            <p className="mt-1 text-sm leading-relaxed text-healiu-dark">
              Add a discharge summary, blood-work results or surgical procedure notes. Only
              files you upload here will be used. No other files are imported.
            </p>
          </div>

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              addFiles(event.dataTransfer.files);
            }}
            className={cn(
              "rounded-xl border border-dashed px-4 py-6 text-center",
              dragging ? "border-healiu-blue bg-healiu-blue-light" : "border-[#D5DCE6]",
            )}
          >
            <Upload className="mx-auto size-5 text-healiu-blue" />
            <p className="mt-2 text-sm text-healiu-dark">
              Drag and drop files here, or choose files
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 inline-flex h-10 items-center rounded-xl border border-[#E6E8EC] bg-white px-4 text-sm font-medium text-healiu-dark-dark hover:border-healiu-blue"
            >
              Choose files
            </button>
            <input
              ref={fileInputRef}
              id={fileInputId}
              type="file"
              accept="application/pdf,image/jpeg,image/png"
              multiple
              className="sr-only"
              onChange={(event) => {
                if (event.target.files) addFiles(event.target.files);
                event.target.value = "";
              }}
            />
          </div>
          <p className="text-xs leading-relaxed text-healiu-dark">
            PDF, JPG or PNG · Maximum 10 MB per file
          </p>
          {fileError ? <p className="text-xs text-red-500">{fileError}</p> : null}

          {records.length > 0 ? (
            <ul className="space-y-2">
              {records.map((record) => (
                <li
                  key={record.id}
                  className="flex items-center gap-3 rounded-xl border border-[#E6E8EC] px-3 py-3"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-healiu-blue-light text-healiu-blue">
                    <FileText className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-healiu-dark-dark">
                      {record.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-healiu-dark">
                      Uploaded · {record.kind} · {record.sizeLabel}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => viewRecord(record)}
                    className="text-sm font-medium text-healiu-blue hover:underline"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => removeRecord(record.id)}
                    className="text-sm font-medium text-healiu-dark hover:text-healiu-dark-dark"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-12 w-28 shrink-0 rounded-xl border-healiu-blue bg-white text-sm font-medium text-healiu-blue hover:bg-healiu-blue-light hover:text-healiu-blue"
          >
            Back
          </Button>
          <Button
            type="submit"
            className={cn(ctaPrimaryClassName, "h-12 flex-1 rounded-xl")}
            style={ctaPrimaryStyle}
          >
            Continue
          </Button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <Link href="/" className="font-medium text-healiu-blue hover:underline">
              Save & exit
            </Link>
            <button
              type="button"
              onClick={onContinue}
              className="font-medium text-healiu-blue hover:underline"
            >
              Skip for now
            </button>
          </p>
          <p className="text-xs text-healiu-dark sm:text-right">
            Editing from review? Save & return to review
          </p>
        </div>
      </form>
    </section>
  );
}
