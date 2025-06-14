from helpers.text_processing import clean_text
from helpers.text_labeling import (
    get_explicit_language_label, 
    get_urgent_language_label, 
    get_unreal_promises_label, 
    get_affective_manipulation_label, 
    get_emotional_tone_label, 
    get_identity_impersonation_label, 
    get_request_personal_information_label, 
    get_request_sensible_information_label, 
    get_request_transference_label
)
from helpers.results_processing import (
    process_explicit_language_results,
    process_urgent_language_results,
    process_emotional_tone_results,
    process_identity_impersonation_results,
    process_request_personal_information_results,
    process_request_transference_results,
    process_request_sensible_information_results,
    process_unreal_promises_results,
    process_affective_manipulation_results
)

def analyze_explicit_language(sentences):
    results = []
    
    for sentence in sentences:
        clean_sentence=clean_text(sentence)
        explicity_result = get_explicit_language_label(clean_sentence)
        print(explicity_result)
        results.append(explicity_result)
        
    return process_explicit_language_results(results)

def analyze_urgent_language(sentences):
    results = []
    
    for sentence in sentences:
        clean_sentence=clean_text(sentence)
        urgency_result = get_urgent_language_label(clean_sentence)
        results.append(urgency_result)
        
    return process_urgent_language_results(results)

def analyze_emotional_tone(sentences):
    results = []
    
    for sentence in sentences:
        clean_sentence=clean_text(sentence)
        emotional_result = get_emotional_tone_label(clean_sentence)
        results.append(emotional_result)
        
    return process_emotional_tone_results(results)

def analyze_identity_impersonation(sentences):
    results = []
    
    for sentence in sentences:
        clean_sentence=clean_text(sentence)
        impersonation_result = get_identity_impersonation_label(clean_sentence)
        results.append(impersonation_result)
        
    return process_identity_impersonation_results(results)

def analyze_request_personal_information(sentences):
    results = []
    
    for sentence in sentences:
        clean_sentence=clean_text(sentence)
        personal_result = get_request_personal_information_label(clean_sentence)
        results.append(personal_result)
        
    return process_request_personal_information_results(results)

def analyze_request_transference(sentences):
    results = []
    
    for sentence in sentences:
        clean_sentence=clean_text(sentence)
        transfer_result = get_request_transference_label(clean_sentence)
        results.append(transfer_result)
        
    return process_request_transference_results(results)

def analyze_request_sensible_information(sentences):
    results = []
    
    for sentence in sentences:
        clean_sentence=clean_text(sentence)
        sensible_result = get_request_sensible_information_label(clean_sentence)
        results.append(sensible_result)
        
    return process_request_sensible_information_results(results)

def analyze_unreal_promises(sentences):
    results = []
    
    for sentence in sentences:
        clean_sentence=clean_text(sentence)
        unreal_result = get_unreal_promises_label(clean_sentence)
        results.append(unreal_result)
        
    return process_unreal_promises_results(results)

def analyze_affective_manipulation(sentences):
    results = []
    
    for sentence in sentences:
        clean_sentence=clean_text(sentence)
        afective_result = get_affective_manipulation_label(clean_sentence)
        results.append(afective_result)
        
    return process_affective_manipulation_results(results)
    