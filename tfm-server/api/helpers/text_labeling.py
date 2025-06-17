from helpers.llm import analyze_with_llm

def get_explicit_language_label(text):
        print("Analizando explicicidad")
        instruction = (
            "Label the following text for EXPLICITY using: EXPLICIT or NEUTRAL.\n\n"
            "- EXPLICIT: suggestive, adult, or sexual content.\n"
            "- NEUTRAL: professional or safe for all audiences.\n\n"
            "The text to analyze is:\n\"{TEXT}\"\n\n"
            "Answer in this format: RESULT: {EXPLICIT|NEUTRAL}"
        )
        result = analyze_with_llm(text, instruction, r'\b(EXPLICIT|NEUTRAL)\b')
        return result
    
def get_urgent_language_label(text):
    print("Analizando urgencia")
    instruction = (
        "Label the following email for URGENCY using one of the following labels: URGENT or NEUTRAL.\n\n"
        "- URGENT: if the email uses language that pressures the recipient to act quickly, imposes time limits, "
        "or evokes a sense of emergency or immediate consequence.\n"
        "- NEUTRAL: if the email uses calm, informative, or professional language without imposing urgency or pressure.\n\n"
        "The text to analyze is:\n\"{TEXT}\"\n\n"
        "Answer in this format: RESULT: {URGENT|NEUTRAL}"
    )
    result = analyze_with_llm(text, instruction, r'\b(URGENT|NEUTRAL)\b')
    return result

def get_emotional_tone_label(text):
    print("Analizando tono emocional o dramático")
    instruction = (
        "Label the EMOTIONAL TONE of the following email using one of the following labels: EMOTIONAL or NEUTRAL.\n\n"
        "- EMOTIONAL: The message uses emotionally manipulative, intense, or persuasive language intended to influence or provoke a reaction.\n"
        "- NEUTRAL: The message is objective, informational, and lacks emotionally charged language.\n\n"
        "The text to analyze is:\n\"{TEXT}\"\n\n"
        "Answer in this format: RESULT: {EMOTIONAL|NEUTRAL}"
    )
    result = analyze_with_llm(text, instruction, r'\b(EMOTIONAL|NEUTRAL)\b')
    return result

def get_identity_impersonation_label(text):
    print("Analizando suplantación sospechosa de identidad")
    instruction = (
        "Label the following email for possible IDENTITY IMPERSONATION using one of the following labels: "
        "IMPERSONATION or SAFE.\n\n"
        "- IMPERSONATION: if the sender pretends to be someone they are not (e.g., fake CEO, supplier, government), "
        "tries to manipulate trust, or uses misleading identity cues.\n"
        "- SAFE: if there are no signs of identity impersonation and the sender's identity seems legitimate.\n\n"
        "The text to analyze is:\n\"{TEXT}\"\n\n"
        "Answer in this format: RESULT: {IMPERSONATION|SAFE}"
    )
    result = analyze_with_llm(text, instruction, r'\b(IMPERSONATION|SAFE)\b')
    return result

def get_request_personal_information_label(text):
    print("Analizando solicitud de información personal")
    instruction = (
        "Label the following email for PERSONAL INFORMATION REQUEST using one of the following labels: "
        "REQUESTED or SAFE.\n\n"
        "- REQUESTED: if the email asks for personal information such as full name, date of birth, phone number, "
        "home address, ID number, or other identity-related contact details.\n"
        "- SAFE: if the email does not request any personal identification or contact information.\n\n"
        "The text to analyze is:\n\"{TEXT}\"\n\n"
        "Answer in this format: RESULT: {REQUESTED|SAFE}"
    )
    return analyze_with_llm(text, instruction, r'\b(REQUESTED|SAFE)\b')

def get_request_transference_label(text):
    print("Analizando solicitud de transferencias de dinero")
    instruction = (
        "Label the following email for MONEY TRANSFER REQUEST using one of the following labels: REQUESTED or SAFE.\n\n"
        "- REQUESTED: if the email asks for a money transfer, payment, wire transaction, invoice payment, or any financial transaction.\n"
        "- SAFE: if the email does not request any kind of money or financial transfer.\n\n"
        "The text to analyze is:\n\"{TEXT}\"\n\n"
        "Answer in this format: RESULT: {REQUESTED|SAFE}"
    )
    result = analyze_with_llm(text, instruction, r'\b(REQUESTED|SAFE)\b')
    return result

def get_request_sensible_information_label(text):
    print("Analizando solicitud de información sensible")
    instruction = (
        "Label the following email for SENSITIVE INFORMATION REQUEST using one of the following labels: "
        "REQUESTED or SAFE.\n\n"
        "- REQUESTED: if the email asks for sensitive information such as passwords, credit card numbers, "
        "bank account details, PIN codes, authentication tokens, or secure access links.\n"
        "- SAFE: if the email does not ask for any sensitive or confidential information.\n\n"
        "The text to analyze is:\n\"{TEXT}\"\n\n"
        "Answer in this format: RESULT: {REQUESTED|SAFE}"
    )
    return analyze_with_llm(text, instruction, r'\b(REQUESTED|SAFE)\b')

def get_unreal_promises_label(text):
    print("Analizando promesas exageradas o irreales")
    instruction = (
        "Label the following email for UNREALISTIC PROMISES using one of the following labels: UNREAL or SAFE.\n\n"
        "- UNREAL: if the email contains exaggerated or unrealistic promises.\n"
        "- SAFE: if the email does not make exaggerated or suspicious promises.\n\n"
        "The text to analyze is:\n\"{TEXT}\"\n\n"
        "Answer in this format: RESULT: {UNREAL|SAFE}"
    )
    result = analyze_with_llm(text, instruction, r'\b(UNREAL|SAFE)\b')
    return result

def get_affective_manipulation_label(text):
    print("Analizando manipulación afectiva")
    instruction = (
        "Label the following email for AFFECTIVE MANIPULATION using one of the following labels: MANIPULATIVE or NEUTRAL.\n\n"
        "- MANIPULATIVE: if the text uses emotional pressure, guilt, fear, compassion, urgency tied to personal appeals, or any sentimental manipulation to influence the reader's actions.\n"
        "- NEUTRAL: if the text communicates without using emotional tactics to influence the reader.\n\n"
        "The text to analyze is:\n\"{TEXT}\"\n\n"
        "Answer in this format: RESULT: {MANIPULATIVE|NEUTRAL}"
    )
    result = analyze_with_llm(text, instruction, r'\b(MANIPULATIVE|NEUTRAL)\b')
    return result