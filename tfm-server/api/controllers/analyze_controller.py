import threading
import json
from services.redis_service import get_redis_client
from helpers.text_processing import tokenize_and_segment
from helpers.text_analysis import (
    analyze_explicit_language,
    analyze_urgent_language,
    analyze_emotional_tone,
    analyze_identity_impersonation,
    analyze_request_personal_information,
    analyze_request_transference,
    analyze_request_sensible_information,
    analyze_unreal_promises,
    analyze_affective_manipulation,
)
from collections import defaultdict

def start_analysis(message, client_id):
    
    redis_client = get_redis_client()
    
    try:
        redis_client.ping()
        print("✅ Redis connection OK")
    except Exception as e:
        print("❌ Redis connection failed:", e)
    
    def send_update(client_id, description, progress):
        redis_client.publish('analyze_updates', json.dumps({
            "client_id": client_id,
            "status": "on_course",
            "payload": {
                "desc": description,
                "progress": progress
            }
        }))
    
    print("Analisis iniciado")
    def background_task(message, client_id):
        try:
            sentences = tokenize_and_segment(message)
            
            passed_audits = []
            diagnostics = []
            
            send_update(client_id, "Analizando EXPLICITY LANGUAGE", 1)
            
            explicity_diagnostics, explicity_passed_audits = analyze_explicit_language(sentences)
            
            passed_audits.extend(explicity_passed_audits)
            diagnostics.extend(explicity_diagnostics)
            
            send_update(client_id, "Analizando URGENCY LANGUAGE", 2)
            
            urgency_diagnostics, urgency_passed_audits = analyze_urgent_language(sentences)
            
            passed_audits.extend(urgency_passed_audits)
            diagnostics.extend(urgency_diagnostics)
            
            send_update(client_id, "Analizando EMOTIONAL TONE", 3)
            
            emotional_diagnostics, emotional_passed_audits = analyze_emotional_tone(sentences)
            
            passed_audits.extend(emotional_passed_audits)
            diagnostics.extend(emotional_diagnostics)
            
            send_update(client_id, "Analizando IDENTITY IMPERSONATION", 4)
            
            impersonation_diagnostics, impersonation_passed_audits = analyze_identity_impersonation(sentences)
            
            passed_audits.extend(impersonation_passed_audits)
            diagnostics.extend(impersonation_diagnostics)
            
            send_update(client_id, "Analizando REQUEST OF PERSONAL INFORMATION", 5)
            
            personal_diagnostics, personal_passed_audits = analyze_request_personal_information(sentences)
            
            passed_audits.extend(personal_passed_audits)
            diagnostics.extend(personal_diagnostics)
            
            send_update(client_id, "Analizando REQUEST TRANSFERENCE", 6)
            
            transfer_diagnostics, transfer_passed_audits = analyze_request_transference(sentences)
            
            passed_audits.extend(transfer_passed_audits)
            diagnostics.extend(transfer_diagnostics)
            
            send_update(client_id, "Analizando REQUEST SENSIBLE INFORMATION", 7)
            
            sensible_diagnostics, sensible_passed_audits = analyze_request_sensible_information(sentences)
            
            passed_audits.extend(sensible_passed_audits)
            diagnostics.extend(sensible_diagnostics)
            
            send_update(client_id, "Analizando UNREAL PROMISES", 8)
            
            unreal_diagnostics, unreal_passed_audits = analyze_unreal_promises(sentences)
            
            passed_audits.extend(unreal_passed_audits)
            diagnostics.extend(unreal_diagnostics)
            
            send_update(client_id, "Analizando AFFECTIVE MANIPULATION", 9)
            
            afective_diagnostics, afective_passed_audits = analyze_affective_manipulation(sentences)
            
            passed_audits.extend(afective_passed_audits)
            diagnostics.extend(afective_diagnostics)
            
            summary = defaultdict(lambda: {"passed": 0, "failed": 0})

            for item in passed_audits:
                for applies_to in item["appliesTo"]:
                    summary[applies_to]["passed"] += 1

            for item in diagnostics:
                for applies_to in item["appliesTo"]:
                    summary[applies_to]["failed"] += 1
                    
            results_dict = {
                "passedAudits": {
                    "number": len(passed_audits),
                    "list": passed_audits
                },
                "diagnostics": {
                    "number": len(diagnostics),
                    "list": diagnostics
                },
                "summary": summary
            }
            
            results_json = json.dumps(results_dict, ensure_ascii=False, indent=4)
            print(results_json)
                
            result = {"report": results_json }
            redis_client.publish('analyze_updates', json.dumps({
                "client_id": client_id,
                "status": "completed",
                "payload": result
            }))
        except Exception as e:
            print(e)
            print("[ERROR] Falló la petición al LLM: {e}")
            error_payload = {"status": "error", "message": str(e)}
            redis_client.publish('analyze_updates', json.dumps({
                "client_id": client_id,
                "payload": error_payload
            }))                
    
    threading.Thread(target=background_task, args=(message, client_id), daemon=True).start()