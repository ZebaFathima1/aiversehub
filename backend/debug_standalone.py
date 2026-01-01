import os
import sys
import django
from django.conf import settings

# Add current directory to path so 'events' module is found
sys.path.append(os.getcwd())

if not settings.configured:
    settings.configure(
        DEBUG=True,
        SECRET_KEY='secret',
        DATABASES={
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': os.path.join(os.getcwd(), 'db.sqlite3'),
            }
        },
        INSTALLED_APPS=[
            'events',
            'django.contrib.contenttypes',
            'django.contrib.auth',
        ],
    )

try:
    django.setup()
    from events.models import Event

    print("--- STANDALONE DEBUG START ---")
    events = Event.objects.all()
    print(f"Total Events: {events.count()}")
    
    for e in events:
        print(f"Title: {e.title}")
        print(f"Status: {e.status}")
        print(f"Cover Image: {e.image}")
        print(f"Gallery Images Count: {e.gallery_images.count()}")
        print("----------------")
    print("--- STANDALONE DEBUG END ---")

except Exception as e:
    print(f"ERROR: {e}")
    import traceback
    traceback.print_exc()
