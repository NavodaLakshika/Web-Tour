-- TALES OF CEYLON - DATABASE SCHEMA
-- Execute this in the Supabase SQL Editor

-- 1. DESTINATIONS TABLE
CREATE TABLE IF NOT EXISTS destinations (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    location TEXT,
    region TEXT,
    interest TEXT,
    image TEXT,
    rating DECIMAL(2,1),
    description TEXT,
    attractions TEXT[], -- Array of strings
    best_time TEXT,
    price TEXT,
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS experiences (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    category TEXT,
    location TEXT,
    image TEXT,
    price TEXT,
    duration TEXT,
    difficulty TEXT,
    best_time TEXT,
    description TEXT,
    highlights TEXT[], -- Array of strings
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CONTACT MESSAGES (For the Contact Us page)
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, read, replied
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. NEWSLETTER SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ITINERARIES
CREATE TABLE IF NOT EXISTS itineraries (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    duration TEXT NOT NULL,
    title TEXT NOT NULL,
    route TEXT NOT NULL,
    description TEXT,
    activities TEXT[], -- Array of strings
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TRIP REQUESTS (For the Plan Your Visit form)
CREATE TABLE IF NOT EXISTS trip_requests (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    focus TEXT,
    duration TEXT,
    accommodation TEXT[],
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ENABLE ROW LEVEL SECURITY (RLS)
-- Destinations: Public read, Admin write
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Admin All Destinations" ON destinations FOR ALL USING (true);

-- Experiences: Public read, Admin write
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Admin All Experiences" ON experiences FOR ALL USING (true);

-- Itineraries: Public read, Admin write
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Itineraries" ON itineraries FOR SELECT USING (true);
CREATE POLICY "Admin All Itineraries" ON itineraries FOR ALL USING (true);

-- Trip Requests: Anon insert, Admin read/write
ALTER TABLE trip_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anon Insert Trip Requests" ON trip_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Trip Requests" ON trip_requests FOR ALL USING (true);

-- Contact Messages: Anonymous write, Admin read/write
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anon Insert Contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Contact" ON contact_messages FOR ALL USING (true);

-- Newsletter: Anonymous write
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anon Insert Newsletter" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin All Newsletter" ON newsletter_subscriptions FOR ALL USING (true);
