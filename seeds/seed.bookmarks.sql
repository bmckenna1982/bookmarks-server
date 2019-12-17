BEGIN;

insert into bookmarks (title, page_url, page_description)
  values
    ('Google', 'http://www.google.com', 'Google description'),
    ('ESPN', 'http://www.espn.com', 'ESPN Sports network'),
    ('NHL', 'http://www.nhl.com', 'NHL Official site'),
    ('Thinkful', 'http://www.thinkful.com', 'Thinkful coding bootcamp'),
    ('Youtube', 'http://www.youtube.com', 'Online video library'),
    ('Yahoo', 'http://www.yahoo.com', 'Yahoo description'),
    ('MLB', 'http://www.MLB.com', 'MLB Sports network'),
    ('NFL', 'http://www.NFL.com', 'NFL Official site'),
    ('Github', 'http://www.github.com', 'Github development hosting'),
    ('Sportability', 'http://www.Sportability.com', 'Online league managment');

COMMIT;