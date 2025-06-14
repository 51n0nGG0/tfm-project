export interface Report {
    passedAudits: {
        number: number;
        list: AuditItem[];
    };
    diagnostics: {
        number: number;
        list: DiagnosticItem[];
    };
    summary: Record<string, SummaryItem>;
}

export interface AuditItem {
    name: string;
    shortDescription: string;
    longDescription: string;
    appliesTo: string[];
}

export interface DiagnosticItem {
    name: string;
    shortDescription: string;
    longDescription: string;
    appliesTo: string[];
    failureDetails: FailureDetails;
}

export interface FailureDetails {
    reason: string;
    evidence: EvidenceItem[];
}

export interface EvidenceItem {
    location: string;
    text: string;
}

export interface SummaryItem {
    passed: number;
    failed: number;
}