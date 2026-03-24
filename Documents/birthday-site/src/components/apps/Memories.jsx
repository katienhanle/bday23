'use client'

// EDIT: Fill in title and note for each photo entry below.

const MONTHS = [
  { label: 'April 2025', sub: 'moments since your previous birthday ✦', photos: [
    { file: '04092025.gif', date: 'Apr 9', title: 'you turned 22', note: 'i went with yy to utc first to get you a couple of gifts. she helped me pick out the ysl lipstick, i thought the marc jacobs perfume would suit you, and i got you a necklace i thought you would like.' },
  ]},
  { label: 'May 2025', sub: null, photos: [
    { file: '05052025.JPG',    date: 'May 4',  title: 'my ub performance', note: 'i had a rough time with news from my family, but seeing you and our friends really, really helped. i am so grateful that you came to watch and as heavy as my heart was, you being there helped a lot.' },
    { file: '05102025.JPG',    date: 'May 9', title: 'bereal from rodeo pratice', note: 'i think these practices are funny to look back on, especially knowing that only amanda knew about us..' },
    { file: '05212025.JPG',    date: 'May 9', title: 'eating at your old apartment at night', note: 'i liked sitting on the couch, eating, and watching things together' },
    { file: '05112025_2.JPEG', date: 'May 10', title: '', note: 'we went to hannah wellness spa for a massage, walked to the beach, looked at the water, ate pasta at cafe milano, and walked to get some ice cream...special day~' },
    { file: '05112025.jpg',    date: 'May 11', title: 'roller skating with kut', note: 'i thought it was really cute whenever you would hold onto me, and i was really happy that you were willing to come even if you were a bit scared, made me feel like you were relying on me a bit hehe' },
    { file: '05182025.jpg',    date: 'May 18', title: 'i kept looking for you', note: 'you were taking grad photos for your friends, i kept looking at your location on my phone secretly.. i wanted to see you and to be near you' },
    { file: '05222025.JPG',    date: 'May 22', title: 'clubbing with friends', note: 'we went to the club, i wanted to stick with you all the time' },
    { file: '05252025.jpg',    date: 'May 23', title: 'watched the stitch movie', note: 'i remember being worried about your head.. we got haidilao with buldak fam, watched lilo and stitch, then i ended up back at your apartment' },
    { file: '05272025.JPG',    date: 'May 27', title: 'took grad photos together', note: 'the first thing i noticed was that there were no security cameras in the editing room when we went into it later and i had inappropriate thoughts' },
    { file: '05312025.JPG',    date: 'May 31', title: 'heading to LA by amtrack', note: 'this was cute, traveling with you on the amtrack, ending up in LA; no car but still a core memory i got to experience with you' },
  ]},
  { label: 'June 2025', sub: null, photos: [
    { file: '06012025.jpg',    date: 'Jun 1',  title: 'head in the clouds!', note: 'met new people, listened to music, took photos, my girlfriend and i wore black and white~' },
    { file: '06082025.JPG',    date: 'Jun 7',  title: 'kut performance', note: 'we read everyones notes, i started crying, we took photobooth photos, kissed you' },
    { file: '06092025.jpg',    date: 'Jun 8',  title: 'pho cow kali', note: 'went to eat with kut lship for dinner before the meeting, i watched you sleep for 40 minutes later that night hahaha and you woke up and starting crying so cute' },
    { file: '06112025.JPG',    date: 'Jun 11', title: 'sailor moon grad pics', note: 'took grad pics with sailor moon, we filmed rodeo this day, then went to welfare; i missed you and i kept looking for you.. sorry for throwing up that night' },
    { file: '06132025.jpg',    date: 'Jun 12', title: 'haidilao with buldak', note: 'my discord logs say that i did not get brunch with karina the morning after because i was too tired and i wanted to stay in bed to cuddle you' },
    { file: '06142025.JPG',    date: 'Jun 13', title: 'electrik seoul', note: 'we kept going to the restroom, you were all up on me! where did your self control go' },
    { file: '06152025.JPG',    date: 'Jun 14', title: 'my graduation', note: 'thank you for coming to see me off, i wish we could have kissed but i did hope in my heart that i would see you again and again, so it would be okay' },
    { file: '06282025_2.jpg',  date: 'Jun 27', title: 'ariel in norcal', note: 'took kianas workshop in sf, you got to meet a couple of my friends' },
    { file: '06282025.gif',    date: 'Jun 28', title: 'fun date day', note: 'wwe were cuddling and scrolling on tiktok when we saw this foodieland video and decided to spontaneously go later in the day, we went to target too' },
    { file: '06302025.jpg',    date: 'Jun 30', title: 'date date dateee', note: 'we got malatang with nathan, then went to a bakery and got heytea; after that we went to valleyfair for photobooth and target to buy dorothy a roblox gift card' },
    { file: '07042025.jpg', date: 'Jun 30', title: 'me n my baby', note: 'i think we look really good together' },

  ]},
  { label: 'July 2025', sub: null, photos: [
    { file: '07022025.gif', date: 'Jul 2', title: 'ariel in kt home', note: 'this video makes me happy what are you doing baby you so comfy around me i am glad i hope you are always having fun with me' },
    { file: '07032025.JPG', date: 'Jul 2', title: 'macbook photos', note: 'you look a little shy here you so cute' },
  ]},
  { label: 'August 2025', sub: null, photos: [
    { file: '08032025.jpg', date: 'Aug 3',  title: 'kcon', note: 'filmed with p1harmony this morning and explored the convention after, we got marugame with san and shania, had fun back at the hotel' },
    { file: '08042025.jpg', date: 'Aug 4',  title: 'midnight', note: 'we made so many fun memories during kcon' },
    { file: '08062025.JPG', date: 'Aug 5',  title: 'ariel room', note: 'we went to a cafe around convoy then ate at min sok chon' },
    { file: '08122025.jpg', date: 'Aug 12', title: 'wi spa', note: 'fell asleep on the rooftop.. what a beautiful day' },
  ]},
  { label: 'September 2025', sub: null, photos: [
    { file: '09112025.JPG', date: 'Sep 10', title: 'convoy music bar', note: 'got pho cow cali with joshua, you, and me, then you had your nails appointment; we went to convoy music bar; nice vibes' },
  ]},
  { label: 'October 2025', sub: null, photos: [
    { file: '10022025.JPG',    date: 'Oct 2',  title: 'a perfect day', note: 'i gave you a fortune cookie and you became mine!' },    
    { file: '10052025.gif',    date: 'Oct 3',  title: 'filming', note: 'i like filming videos with you and i like that you like me however i look, you flatter me a lot and you call me pretty and my heart flies a bit' },
    { file: '10082025.jpg',    date: 'Oct 3',  title: 'clubbing with friends', note: 'my girlfriend disappeared from me the day after we became girlfriends! but she apologized lots and said she promised she would make it up to me by watching demon slayer with me' },
    { file: '10102025.jpg',    date: 'Oct 9', title: 'happy lappy', note: 'we watch demon slayer when we eat, then we went to tram coffee to do our work, later ate mian sichuan noodles with nancy' },
    { file: '10132025.gif',    date: 'Oct 13', title: 'cat date day', note: 'had brunch at sweet maple, stopped by bunnys cafe to look at trinkets, i bought a miffy cup, it was raining! we went to mini cat town greatmall, and two cats were named squish and chiquita; they were so small.. we got 3cat later!' },
    { file: '10142025.JPEG',   date: 'Oct 14', title: 'sfo departure', note: 'bye bye baby! we got duc huong sandwiches in the morning, went to vietnam town for tram coffee, but your wintermelon tea was not wintermelon tea... poor $8..' },
    { file: '10252025.jpg',    date: 'Oct 24', title: 'a2o may', note: 'i drove down to la, got there around 11am, helped you move in, then we went straight to a2o may showcase' },
    { file: '10252025_2.jpg',  date: 'Oct 25', title: 'errands day', note: 'we went to ikea, daiso, hmart, odd one out, target, and unpacked everything; i put together your shoe shelf and put up the shower curtain while you unpacked' },
    { file: '10282025.jpg',    date: 'Oct 28', title: 'a day in la', note: 'drove you to your interview in the morning, while you were in there i called steven and misa, we got small portions of bingsoo, then went home to prep food and watch demon slayer in the tv room' },
    { file: '11012025.jpg', date: 'Oct 30', title: 'halloween', note: 'i drew your spider tattoo! we got dinner with friends at bcd tofu house, went to exchange la electrik seoul, it was fun! we completely knocked out at home instead of having fun though...' },

  ]},
  { label: 'November 2025', sub: null, photos: [
    { file: '11022025.JPG', date: 'Nov 1', title: 'last day in la', note: 'we got brunch at that korean fusion place, i packed a bit, left the morning after' },
  ]},
  { label: 'December 2025', sub: 'holiday magic ✨', photos: [
    { file: '12062025.JPG',   date: 'Dec 6',  title: 'date day in sf', note: 'picked my cutie gf up from sfo, went to tadaima and the boat area, stopped at japatown to buy nancy a birthday gift' },
    { file: '12072025.JPG',   date: 'Dec 6',  title: 'date day and drove to sj', note: 'same day, just went to christmas in the part at night!' },
    { file: '12102025.JPEG',  date: 'Dec 9', title: 'my gf is the cutest', note: 'we cuddled all day and ate bun rieu' },
    { file: '12272025.jpg',   date: 'Dec 26', title: 'overcooked masters', note: 'ate the rest of our yupdduk, watched our video together on the couch, did our makeup, filmed tiktoks then went out to a cute bar/restaurant that had pasta, we walked to odd one out after, played overcooked til level 3-1' },
    { file: '12282025.jpg',   date: 'Dec 27', title: 'christmas is here!', note: 'we went to ygf in the morning, went to the grove, walked around lots, went to cafe upper, went home' },
    { file: '12282025_2.JPG', date: 'Dec 27', title: 'matching outfits', note: 'your cute flower bouquet will live on in our memories' },
  ]},
  { label: 'January 2026', sub: 'new year, still us', photos: [
    { file: '01142026.JPG', date: 'Jan 14', title: 'welcome back to norcal!', note: 'we went to sohn in sf after i picked you up from the airport, drove to a street to walk around and take photos, went to haight st too, took photobooth at hamu studios with capybara hats, then got molly tea and malatang' },
    { file: '01232026.jpg', date: 'Jan 23', title: 'hapa hapa', note: 'we went to paiks to eat with lexie after going to paiks, then got melo melo, went to her apt, then you gave me my scarf gift when we came home (i love it!!!)' },
    { file: '01252026.jpg', date: 'Jan 25', title: 'twice!', note: 'concerts are so much fun with my girlfriend' },
    { file: '01272026.JPG', date: 'Jan 27', title: 'passenger princess', note: 'youre soooooooo pretty i will drive you anywhere you want in the world' },
    { file: '01282026.jpg', date: 'Jan 27', title: 'my amazing cook', note: 'my girlfriend makes me garlic chili pasta whenever i am craving it because she loves me' },
  ]},
  { label: 'February 2026', sub: '💝', photos: [
    { file: '02132026.JPG', date: 'Feb 12', title: 'matching PJs', note: 'we stayed home, watched a bit of the demon slayer movie, made matcha, we love to play draw me on roblox!' },
    { file: '02152026.JPG', date: 'Feb 14', title: 'my valentines', note: 'went to los gatos for a valentines brunch, walked around a bit, got tadaima, went to de young museum, then went to valleyfair, walked around, photobooth, and dinner reservation at eataly' },
    { file: '02162026.JPG', date: 'Feb 15', title: 'celebrating tet', note: 'we are so blue kakaka' },
    { file: '02252026.JPG', date: 'Feb 20', title: 'club at nova', note: 'i saw you at nova but the music sucked so we went to riches with nathan.. we didnt go home together!' },
  ]},
  { label: 'March 2026', sub: null, photos: [
    { file: '03082026.jpg',  date: 'Mar 8',  title: 'date in santa monica', note: 'i took pretty photos of my pretty girlfriend and we ate cheesecake factory after!' },
    { file: '03162026.jpg',  date: 'Mar 16', title: 'movie date', note: 'watched hopper! i eat popcorn super fast' },
    { file: '03182026.JPEG', date: 'Mar 18', title: 'bye bye! see you soon', note: 'my cutie gf must return to la to go to the office tmr morning!' },
  ]},
  { label: 'April 2026', sub: 'happy birthday again 🩷', photos: [] },
]

function PhotoCard({ photo, index }) {
  const flip = index % 2 !== 0

  return (
    <div style={{
      display: 'flex',
      flexDirection: flip ? 'row-reverse' : 'row',
      gap: 14,
      marginBottom: 20,
      alignItems: 'center',
    }}>
      <div style={{ flex: '0 0 55%' }}>
        <img
          src={`/memories/${photo.file}`}
          alt={photo.date}
          style={{ width: '100%', display: 'block', borderRadius: 4 }}
        />
      </div>

      <div style={{
        flex: 1,
        textAlign: flip ? 'right' : 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
          {photo.date}
        </div>
        <div style={{
          fontFamily: 'var(--font-title)',
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.3,
        }}>
          {photo.title || 'title...'}
        </div>
        <p style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.5,
          margin: 0,
        }}>
          {photo.note || ''}
        </p>
      </div>
    </div>
  )
}

// Generate a short label + DOM id for each month
function monthId(label) {
  // e.g. "April 2025" → "APR25"
  const [month, year] = label.split(' ')
  return month.slice(0, 3).toUpperCase() + year.slice(2)
}

function scrollToMonth(id) {
  document.getElementById('month-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Memories({ showMonthNav = false }) {
  let idx = 0

  return (
    <div style={{ fontFamily: 'var(--font-body)', padding: '36px 40px', maxWidth: 760, margin: '0 auto' }}>

      <div style={{
        textAlign: 'center', marginBottom: 14,
        paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ fontFamily: 'var(--font-title)', fontSize: '1.45rem', color: 'var(--pink-hot)' }}>
          Apr 9, 2025 → Apr 9, 2026
        </div>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>
          a whole year of memories ✦
        </div>
      </div>

      {MONTHS.map((month) => {
        const mid = monthId(month.label)
        return (
          <div key={month.label} id={'month-' + mid} style={{ marginBottom: 8, scrollMarginTop: 16 }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 7,
              marginBottom: 10, paddingBottom: 3,
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontFamily: 'var(--font-title)', fontSize: '1.1rem', color: 'var(--pink-hot)' }}>
                {month.label}
              </span>
              {month.sub && (
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>{month.sub}</span>
              )}
            </div>

            {month.photos.length === 0 && (
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', paddingBottom: 8 }}>
                coming soon 🩷
              </div>
            )}

            {month.photos.map((p) => <PhotoCard key={p.file} photo={p} index={idx++} />)}
          </div>
        )
      })}

      <div style={{
        textAlign: 'center', padding: '12px 0 4px',
        fontFamily: 'var(--font-title)', fontSize: '1rem',
        color: 'rgba(255,255,255,0.3)',
      }}>✦ end of year one ✦</div>

      {/* ── Fixed month nav — only in full-screen view ── */}
      {showMonthNav && (
        <div style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: '10px 6px',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          background: 'var(--win-dark-body)',
          zIndex: 200,
        }}>
          {MONTHS.map((month) => {
            const mid = monthId(month.label)
            return (
              <button
                key={mid}
                onClick={() => scrollToMonth(mid)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.35)',
                  padding: '5px 10px',
                  borderRadius: 4,
                  textAlign: 'center',
                  transition: 'color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--pink-hot)'
                  e.currentTarget.style.background = 'rgba(255,63,164,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                  e.currentTarget.style.background = 'none'
                }}
              >
                {mid}
              </button>
            )
          })}
        </div>
      )}

    </div>
  )
}
