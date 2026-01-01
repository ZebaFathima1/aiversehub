import os
import django
import sys
import json

# Setup context
sys.path.append(os.path.join(os.getcwd(), 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aiverse_api.settings')
django.setup()

from events.models import Event
from payments.models import Payment
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

def seed():
    print("Seeding sample data...")
    
    # Get or create admin
    admin_email = 'admin@aiverse.com'
    admin_user = User.objects.filter(email=admin_email).first()
    if not admin_user:
        print(f"Creating admin user {admin_email}...")
        admin_user = User.objects.create_superuser(
            username='admin',
            email=admin_email,
            password='admin123',
            full_name='Admin User',
            is_admin=True
        )
    
    # Create sample events
    print("Ensuring sample events exist with highlights...")
    
    events_to_seed = [
        {
            'slug': "ai-verse-4",
            'title': "AI Verse 4.0",
            'description': "The next frontier of Artificial Intelligence! Join us for AI Verse 4.0 featuring cutting-edge workshops on LLMs, Agentic AI, and the latest breakthroughs in machine learning.",
            'date': timezone.now() + timedelta(days=60),
            'venue': "CSE Department Auditorium",
            'registration_fee': 1499.00,
            'max_participants': 500,
            'status': 'upcoming',
            'is_featured': True,
            'gallery_dir': "aiverse4",
            'highlights': json.dumps(["LLM Workshop", "Agentic AI Lab", "Industry Experts", "Networking Sessions"])
        },
        {
            'slug': "data-stargaze",
            'title': "Data Stargaze",
            'description': "A nocturnal journey into the cosmos, where we showcased the power of AI in astronomical data analysis. Students engaged in live telescope sessions paired with machine learning tracking algorithms.",
            'date': timezone.now() - timedelta(days=730),
            'venue': "Open Air Theatre",
            'registration_fee': 150.00,
            'status': 'completed',
            'gallery_dir': "datastargaze",
            'highlights': json.dumps(["Space Data Mining", "Live Star Tracking", "Cosmology Keynote"])
        },
        {
            'slug': "ai-verse-1",
            'title': "AI Verse: The Genesis",
            'description': "The dawn of the AI Verse series, introducing our community to the fundamentals of predictive modeling. We explored Python for Data Science and initiated our first tech-solving marathon.",
            'date': timezone.now() - timedelta(days=550),
            'venue': "CSE Seminar Hall",
            'registration_fee': 200.00,
            'status': 'completed',
            'gallery_dir': "aiverse1",
            'highlights': json.dumps(["ML Fundamentals", "Python Workshops", "Tech Quiz Bowl"])
        },
        {
            'slug': "ai-verse-2",
            'title': "AI Verse 2.0: Deep Vision",
            'description': "A deep dive into Computer Vision and Neural Networks. We hosted industry experts who demonstrated real-time object detection and the future of autonomous systems.",
            'date': timezone.now() - timedelta(days=365),
            'venue': "College Auditorium",
            'registration_fee': 300.00,
            'status': 'completed',
            'gallery_dir': "aiverse2",
            'highlights': json.dumps(["Computer Vision Lab", "Neural Net Workshop", "Expert Panel"])
        },
        {
            'slug': "ai-verse-3",
            'title': "AI Verse 3.0: The GenAI Era",
            'description': "Our largest festival to date, centered on the Generative AI revolution. From Large Language Models to image synthesis, we explored how AI is redefining creativity and engineering.",
            'date': timezone.now() - timedelta(days=180),
            'venue': "Main Campus Grounds",
            'registration_fee': 499.00,
            'status': 'completed',
            'gallery_dir': "aiverse3",
            'highlights': json.dumps(["LLM Hackathon", "Stable Diffusion Demo", "Future of Work Talk"])
        },
    ]

    for event_data in events_to_seed:
        event, created = Event.objects.update_or_create(
            slug=event_data['slug'],
            defaults=event_data
        )
        if created:
            print(f"Created event: {event.title}")
        else:
            print(f"Updated event: {event.title}")

    print(f"Total events in database: {Event.objects.count()}")

    # Create sample payments
    e_upcoming = Event.objects.filter(slug="ai-verse-4").first()
    if Payment.objects.count() == 0 and e_upcoming:
        print("Creating sample payments...")
        users = User.objects.all()
        for i, user in enumerate(users):
            Payment.objects.create(
                user=user,
                event=e_upcoming,
                amount=e_upcoming.registration_fee,
                transaction_id=f"TXN{user.id}X{int(timezone.now().timestamp())}",
                status='approved' if i % 2 == 0 else 'pending'
            )
        print(f"Created {Payment.objects.count()} payments.")

    print("Seeding complete!")

if __name__ == "__main__":
    seed()
