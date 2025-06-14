def process_explicit_language_results(results):
    print(results)
    diagnostics = []
    passed_audits = []
    
    if "EXPLICIT" in results:
        diagnostics.append({
            "name": "EXPLICITY LANGUAGE",
            "shortDescription": "Contains potentially explicit or inappropriate language.",
            "longDescription": "Detects use of offensive, sexual, or otherwise explicit language.",
            "appliesTo": ["PHISHING", "SCAM", "EMOTIONAL SOCIAL ENGINEERING"],
            "failureDetails": {
                "reason": "",
                "evidence": {
                    "location": "body",
                    "text": ""
                }
            }
        })
    else:
        passed_audits.append({
            "name": "EXPLICITY LANGUAGE",
            "shortDescription": "No explicit or inappropriate language detected.",
            "longDescription": "The email does not contain offensive, sexual, or aggressive language.",
            "appliesTo": ["PHISHING", "SCAM", "EMOTIONAL SOCIAL ENGINEERING"]
        })

    return diagnostics, passed_audits

def process_urgent_language_results(results):
    print(results)
    diagnostics = []
    passed_audits = []
    
    if "URGENT" in results:
        diagnostics.append({
            "name": "URGENCY LANGUAGE",
            "shortDescription": "Uses excessive urgency to pressure the recipient.",
            "longDescription": "Checks if the email uses language that pressures the recipient to act immediately, which is common in phishing, scams, or business email compromise.",
            "appliesTo": ["PHISHING", "SCAM", "BUSINESS EMAIL COMPROMISE"],
            "failureDetails": {
                "reason": "",
                "evidence": {
                    "location": "body",
                    "text": ""
                }
            }
        })
    else:
        passed_audits.append({
            "name": "URGENCY LANGUAGE",
            "shortDescription": "No excessive urgency detected.",
            "longDescription": "The email does not contain language that pressures the recipient to act immediately.",
            "appliesTo": ["PHISHING", "SCAM", "BUSINESS EMAIL COMPROMISE"]
        })

    return diagnostics, passed_audits

def process_emotional_tone_results(results):
    print(results)
    diagnostics = []
    passed_audits = []
    
    if "EMOTIONAL" in results:
        diagnostics.append({
            "name": "EMOTIONAL TONE",
            "shortDescription": "Uses emotionally manipulative language.",
            "longDescription": "Detects language intended to provoke emotional responses such as fear, guilt, or urgency to manipulate the recipient.",
            "appliesTo": ["SCAM", "PHISHING", "EMOTIONAL SOCIAL ENGINEERING"],
            "failureDetails": {
                "reason": "",
                "evidence": {
                    "location": "body",
                    "text": ""
                }
            }
        })
    else:
        passed_audits.append({
            "name": "EMOTIONAL TONE",
            "shortDescription": "No emotionally manipulative language detected.",
            "longDescription": "The email does not contain language that attempts to manipulate the recipient's emotions.",
            "appliesTo": ["SCAM", "PHISHING", "EMOTIONAL SOCIAL ENGINEERING"]
        })

    return diagnostics, passed_audits

def process_identity_impersonation_results(results):
    print(results)
    diagnostics = []
    passed_audits = []
    
    if "IMPERSONATION" in results:
        diagnostics.append({
            "name": "SUSPICIOUS IDENTITY IMPERSONATION",
            "shortDescription": "Claims origin from fake trusted entity.",
            "longDescription": "Checks for mismatches between claimed sender and actual content behavior.",
            "appliesTo": ["PHISHING"],
            "failureDetails": {
                "reason": "",
                "evidence": {
                    "location": "body",
                    "text": ""
                }
            }
        })
    else:
        passed_audits.append({
            "name": "SUSPICIOUS ENTITY IMPERSONATION",
            "shortDescription": "No impersonation detected.",
            "longDescription": "The message does not show signs of impersonation.",
            "appliesTo": ["PHISHING"]
        })

    return diagnostics, passed_audits

def process_request_personal_information_results(results):
    print(results)
    diagnostics = []
    passed_audits = []
    
    if "REQUESTED" in results:
        diagnostics.append({
            "name": "PERSONAL INFORMATION REQUEST",
            "shortDescription": "The email requests personal or sensitive information.",
            "longDescription": "Checks if the email asks the recipient to provide personal data.",
            "appliesTo": ["PHISHING", "SCAM"],
            "failureDetails": {
                "reason": "",
                "evidence": {
                    "location": "body",
                    "text": ""
                }
            }
        })
    else:
        passed_audits.append({
            "name": "PERSONAL INFORMATION REQUEST",
            "shortDescription": "No personal information requested.",
            "longDescription": "The email does not request personal or sensitive information.",
            "appliesTo": ["PHISHING", "SCAM"]
        })

    return diagnostics, passed_audits

def process_request_transference_results(results):
    print(results)
    diagnostics = []
    passed_audits = []
    
    if "REQUESTED" in results:
        diagnostics.append({
            "name": "FUNDS TRANSFERENCE REQUEST",
            "shortDescription": "The email requests transfer of funds or financial transactions.",
            "longDescription": "Checks if the email asks for money transfer or financial actions.",
            "appliesTo": ["SCAM", "BUSINESS EMAIL COMPROMISE"],
            "failureDetails": {
                "reason": "",
                "evidence": {
                    "location": "body",
                    "text": ""
                }
            }
        })
    else:
        passed_audits.append({
            "name": "FUNDS TRANSFERENCE REQUEST",
            "shortDescription": "No funds transfer requested.",
            "longDescription": "The email does not request any fund transfers or financial transactions.",
            "appliesTo": ["SCAM", "BUSINESS EMAIL COMPROMISE"]
        })

    return diagnostics, passed_audits

def process_request_sensible_information_results(results):
    print(results)
    diagnostics = []
    passed_audits = []
    
    if "REQUESTED" in results:
        diagnostics.append({
            "name": "SENSITIVE INFORMATION REQUEST",
            "shortDescription": "The email requests sensitive or confidential information.",
            "longDescription": "Checks if the email asks for confidential or sensitive data.",
            "appliesTo": ["PHISHING", "SCAM"],
            "failureDetails": {
                "reason": "",
                "evidence": {
                    "location": "body",
                    "text": ""
                }
            }
        })
    else:
        passed_audits.append({
            "name": "SENSITIVE INFORMATION REQUEST",
            "shortDescription": "No sensitive information requested.",
            "longDescription": "The email does not request sensitive or confidential information.",
            "appliesTo": ["PHISHING", "SCAM"]
        })

    return diagnostics, passed_audits

def process_unreal_promises_results(results):
    print(results)
    diagnostics = []
    passed_audits = []
    
    if "UNREAL" in results:
        diagnostics.append({
            "name": "UNREALISTIC PROMISES",
            "shortDescription": "The email contains unrealistic or false promises.",
            "longDescription": "Detects exaggerated or untrue promises used to deceive or entice the recipient.",
            "appliesTo": ["SCAM"],
            "failureDetails": {
                "reason": "",
                "evidence": {
                    "location": "body",
                    "text": ""
                }
            }
        })
    else:
        passed_audits.append({
            "name": "UNREALISTIC PROMISES",
            "shortDescription": "No unrealistic promises detected.",
            "longDescription": "The email does not contain unrealistic or false promises.",
            "appliesTo": ["SCAM"]
        })

    return diagnostics, passed_audits

def process_affective_manipulation_results(results):
    print(results)
    diagnostics = []
    passed_audits = []
    
    if "MANIPULATIVE" in results:
        diagnostics.append({
            "name": "AFFECTIVE MANIPULATION",
            "shortDescription": "The email uses emotional manipulation techniques.",
            "longDescription": "Detects attempts to influence the recipient's emotions for manipulative purposes.",
            "appliesTo": ["EMOTIONAL SOCIAL ENGINEERING"],
            "failureDetails": {
                "reason": "",
                "evidence": {
                    "location": "body",
                    "text": ""
                }
            }
        })
    else:
        passed_audits.append({
            "name": "AFFECTIVE MANIPULATION",
            "shortDescription": "No affective manipulation detected.",
            "longDescription": "The email does not attempt to manipulate the recipient emotionally.",
            "appliesTo": ["EMOTIONAL SOCIAL ENGINEERING"]
        })

    return diagnostics, passed_audits