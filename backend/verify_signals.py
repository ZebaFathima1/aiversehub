
import os
import django
from django.conf import settings

# Setup Django standalone
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aiverse_api.settings')
django.setup()

from django.contrib.auth import get_user_model
from events.models import Event, EventRegistration
from payments.models import Payment
from analytics.models import Activity
from django.utils import timezone

User = get_user_model()

def verify_signals():
    print("Prometheus: Starting Signal Verification...")

    # 1. Cleanup previous test data
    email = "signal_test@example.com"
    User.objects.filter(email=email).delete()
    
    # 2. Create Test User and Event
    # The custom user model requires username and full_name
    user = User.objects.create_user(
        username="signal_test", 
        email=email, 
        password="testpassword", 
        full_name="Telemachus"
    )
    event, _ = Event.objects.get_or_create(
        title="Signal Test Event", 
        slug="signal-test-event",
        defaults={
            'date': timezone.now(),
            'end_date': timezone.now(),
            'registration_fee': 100.00,
            'description': 'Test Description',
            'venue': 'Test Venue'
        }
    )
    
    # 3. Simulate Registration (Should trigger Auto-Payment and Activity Log)
    print(f"[-] Registering user {user.email} for {event.title}...")
    registration = EventRegistration.objects.create(user=user, event=event, is_active=False) # Start inactive
    
    # Check 1: Payment Created?
    payment = Payment.objects.filter(user=user, event=event).first()
    if payment:
        print(f"[PASS] Payment auto-created: {payment}")
    else:
        print(f"[FAIL] Payment NOT created.")
        
    # Check 2: Registration Activity Logged?
    activity = Activity.objects.filter(user=user, activity_type='registration').first()
    if activity:
        print(f"[PASS] Registration Activity logged: {activity.action}")
    else:
        print(f"[FAIL] Registration Activity NOT logged.")

    # 4. Simulate Payment Approval (Should trigger Reg Activation and Activity Log)
    if payment:
        print("[-] Approving payment...")
        payment.status = 'approved'
        payment.save()
        
        # Check 3: Registration Activated?
        registration.refresh_from_db()
        if registration.is_active:
            print(f"[PASS] Registration auto-activated.")
        else:
            print(f"[FAIL] Registration NOT activated.")
            
        # Check 4: Payment Activity Logged?
        payment_activity = Activity.objects.filter(user=user, activity_type='payment', action__contains='approved').first()
        if payment_activity:
            print(f"[PASS] Payment Approval Activity logged: {payment_activity.action}")
        else:
            print(f"[FAIL] Payment Approval Activity NOT logged.")
            
    # Cleanup
    user.delete()
    event.delete()
    print("Prometheus: Verification Complete.")

if __name__ == "__main__":
    verify_signals()
