#!/bin/bash

# Create directories if they don't exist
mkdir -p accets/projects

# Download project images
echo "Downloading project images..."

# Project 1 - UI/UX Design
curl -s -o "accets/projects/project1.jpg" "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000&auto=format&fit=crop"

# Project 2 - Coffee Shop Website
curl -s -o "accets/projects/project2.jpg" "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop"

# Project 3 - Fitness Center Web App
curl -s -o "accets/projects/project3.jpg" "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=1000&auto=format&fit=crop"

# Project 4 - Freelance Website
curl -s -o "accets/projects/project4.jpg" "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop"

# Project 5 - Loan Management System
curl -s -o "accets/projects/project5.jpg" "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"

# Project 6 - Tourism Website
curl -s -o "accets/projects/project6.jpg" "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1000&auto=format&fit=crop"

# Download contact illustration
echo "Downloading contact illustration..."
curl -s -o "accets/contact-illustration.png" "https://cdn.dribbble.com/userupload/10572422/file/original-7df3d8debacf25db8c5ea57a1e1652b0.png?resize=752x564"

echo "All images downloaded successfully!" 