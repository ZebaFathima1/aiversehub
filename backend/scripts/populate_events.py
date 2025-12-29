import os
import django
import shutil
from django.core.files import File
from django.utils.text import slugify

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aiverse_api.settings')
django.setup()

from events.models import Event, GalleryImage

def populate():
    # Base directory for images
    base_gallery_path = os.path.join('..', 'public', 'gallery')
    
    events_data = [
        {
            "id_slug": "data-stargaze-2021",
            "name": "Data Stargaze",
            "title": "Data Stargaze",
            "year": "2021",
            "date": "2021-11-10",
            "venue": "Open Air Theatre",
            "description": "A nocturnal journey into the cosmos, where we showcased the power of AI in astronomical data analysis. Students engaged in live telescope sessions paired with machine learning tracking algorithms.",
            "highlights": ["Space Data Mining", "Live Star Tracking", "Cosmology Keynote"],
            "gallery_dir": "datastargaze",
            "cover_filename": "banner.png"
        },
        {
            "id_slug": "ai-verse-2022",
            "name": "AI Verse",
            "title": "AI Verse: The Genesis",
            "year": "2022",
            "date": "2022-04-10",
            "venue": "CSE Seminar Hall",
            "description": "The dawn of the AI Verse series, introducing our community to the fundamentals of predictive modeling. We explored Python for Data Science and initiated our first tech-solving marathon.",
            "highlights": ["ML Fundamentals", "Python Workshops", "Tech Quiz Bowl"],
            "gallery_dir": "aiverse1",
            "cover_filename": "day1.jpg"
        },
        {
            "id_slug": "ai-verse-2-2023",
            "name": "AI Verse 2.0",
            "title": "AI Verse 2.0: Deep Vision",
            "year": "2023",
            "date": "2023-03-20",
            "venue": "College Auditorium",
            "description": "A deep dive into Computer Vision and Neural Networks. We hosted industry experts who demonstrated real-time object detection and the future of autonomous systems.",
            "highlights": ["Computer Vision Lab", "Neural Net Workshop", "Expert Panel"],
            "gallery_dir": "aiverse2",
            "cover_filename": "flashmob.jpg"
        },
        {
            "id_slug": "ai-verse-3-2024",
            "name": "AI Verse 3.0",
            "title": "AI Verse 3.0: The GenAI Era",
            "year": "2024",
            "date": "2024-02-15",
            "venue": "Main Campus Grounds",
            "description": "Our largest festival to date, centered on the Generative AI revolution. From Large Language Models to image synthesis, we explored how AI is redefining creativity and engineering.",
            "highlights": ["LLM Hackathon", "Stable Diffusion Demo", "Future of Work Talk"],
            "gallery_dir": "aiverse3",
            "cover_filename": "venue.jpg"
        }
    ]

    for data in events_data:
        print(f"Processing {data['name']}...")
        
        # Create or update event
        event, created = Event.objects.get_or_create(
            name=data['name'],
            defaults={
                'title': data['title'],
                'year': data['year'],
                'date': data['date'],
                'venue': data['venue'],
                'description': data['description'],
                'highlights': data['highlights'],
                'status': 'completed'
            }
        )

        if not created:
            event.title = data['title']
            event.year = data['year']
            event.date = data['date']
            event.venue = data['venue']
            event.description = data['description']
            event.highlights = data['highlights']
            event.save()

        # Handle Gallery and Cover
        gallery_dir = os.path.join(base_gallery_path, data['gallery_dir'])
        if os.path.exists(gallery_dir):
            filenames = os.listdir(gallery_dir)
            
            for filename in filenames:
                file_path = os.path.join(gallery_dir, filename)
                if os.path.isfile(file_path):
                    with open(file_path, 'rb') as f:
                        django_file = File(f)
                        
                        # Save as gallery image if not already there
                        if not GalleryImage.objects.filter(event=event, image__icontains=filename).exists():
                            gi = GalleryImage(event=event)
                            gi.image.save(filename, django_file, save=True)
                            print(f"  Added gallery image: {filename}")

                        # Set as cover if it matches cover_filename
                        if filename == data['cover_filename']:
                            event.image.save(filename, django_file, save=True)
                            print(f"  Set as cover image: {filename}")

    print("Population completed!")

if __name__ == '__main__':
    populate()
