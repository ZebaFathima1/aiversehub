import os
import sys
import django

# Add current directory to path
sys.path.append(os.getcwd())

# Set settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aiverse_api.settings')

try:
    django.setup()
    from events.models import Event

    print("--- EVENT DEBUG START ---")
    events = Event.objects.all()
    print(f"Total Events: {events.count()}")
    
    for e in events:
        print(f"ID: {e.id}")
        print(f"Title: {e.title}")
        print(f"Status: '{e.status}'") # Quote to see whitespace
        print(f"Cover Image: '{e.image}'")
        print(f"Gallery Images Count: {e.gallery_images.count()}")
        gallery_imgs = list(e.gallery_images.all())
        if gallery_imgs:
             print(f"First Gallery Image: {gallery_imgs[0].image}")
        print("----------------")
    print("--- EVENT DEBUG END ---")

except Exception as e:
    print(f"ERROR: {e}")
