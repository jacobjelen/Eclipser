// Default settings

const default_settings = {
    general: {
        active: true,
        activeTimeCheck: false,
        activeTimeFrom: '08:00',
        activeTimeTo: '17:30',
        weekdays: {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
        },
        showReminderBar: true,
    },

    domains: {
        'facebook.com': {
            url: ['facebook.com', 'fb.com'],
            active: true,
            blocked: false,
            sets: {
                feed: {
                    title: 'Feed',
                    active: true,
                    selectors: [
                        '[role="feed"]',
                        '[aria-label="Stories"]',
                        '[aria-label="Create a post"]',
                        '[data-pagelet="VideoChatHomeUnit"]',
                        '[data-pagelet="VideoChatHomeUnitNoDDD"]'
                    ],
                },
                navigation: {
                    title: 'Left Menu',
                    active: true,
                    selectors: ['[data-pagelet="LeftRail"]'],
                },
                likes: {
                    title: 'Likes & Comments',
                    active: true,
                    selectors: ['div.cwj9ozl2.tvmbv18p', 'div.stjgntxs.ni8dbmo4.l82x9zwi.uo3d90p7.h905i5nu.monazrh9'],
                },
                chat: {
                    title: 'Chat',
                    active: true,
                    selectors: ['[data-pagelet="ChatTab"]'],
                },
                right: {
                    title: 'Right Side Panel',
                    active: true,
                    selectors: ['[data-pagelet="RightRail"]'],
                }
            }
        },
        
        'linkedin.com': {
            url: ['linkedin.com'],
            active: true,
            blocked: false,
            sets: {
                a: {
                    title: 'Feed',
                    active: true,
                    selectors: [
                        '#voyager-feed main#main',
                        '.feeds>#feed-container',
                        '.company-page ~ .feeds>#feed-container'
                    ],
                },
                b: {
                    title: 'Likes & Comments',
                    active: true,
                    selectors: ['.social-details-social-activity', '[data-feed-action="socialActionsLabel"]', '.social-actions-panel', '#comment-preview'],
                },
                c: {
                    title: 'Messaging',
                    active: true,
                    selectors: ['#msg-overlay'],
                },
                d: {
                    title: 'Left Side Column',
                    active: true,
                    selectors: ['.scaffold-layout--sidebar','.scaffold-layout__sticky', '.feed-identity-module'],
                },
                e: {
                    title: 'Right Side Column',
                    active: true,
                    selectors: ['.scaffold-layout__aside'],
                }
            }
        },

        'youtube.com': {
            url: ['youtube.com', 'youtu.be'],
            active: true,
            blocked: false,
            sets: {
                a: {
                    title: 'Recommended Videos',
                    active: true,
                    selectors: ['[page-subtype="home"] #primary', '#header', '#masthead-ad'],
                },
                b: {
                    title: 'Side Menu',
                    active: true,
                    selectors: ['#guide'],
                },
                c: {
                    title: 'Thumbnails',
                    active: false,
                    selectors: ['#thumbnail img'],
                },
                d: {
                    title: 'Video Info',
                    active: true,
                    selectors: ['#info', '#ticket-shelf', '#merch-shelf'],
                },
                e: {
                    title: 'Comments',
                    active: true,
                    selectors: ['#comments','ytd-comments', 'ytm-comment-section-renderer'],
                },
                f: {
                    title: 'Related Videos',
                    active: true,
                    selectors: ['#secondary', '#related', '.ytp-endscreen-content', 'ytd-watch-next-secondary-results-renderer', '[data-content-type="related"]', '.ytp-ce-element.ytp-ce-video', '.ytp-ce-element.ytp-ce-playlist'],
                },
            },
        },

        'amazon.co.uk': {
            url: ["amazon.com.br", "amazon.ca", "amazon.com.mx", "amazon.com", "amazon.cn", "amazon.in", "amazon.co.jp", "amazon.sg", "amazon.ae", "amazon.sa", "amazon.fr", "amazon.de", "amazon.it", "amazon.nl", "amazon.pl", "amazon.es", "amazon.se", "amazon.com.tr", "amazon.co.uk", "amazon.com.au"],
            active: true,
            blocked: false,
            sets: {
                recomendations: {
                    title: 'All Recomendations',
                    active: true,
                    selectors: ['#gw-layout'],
                },
                banner: {
                    title: 'Top Banner',
                    active: true,
                    selectors: ['#desktop-banner'],
                },
                history: {
                    title: 'Inspired by your browsing',
                    active: true,
                    selectors: ['#rhf'],
                },
                footer: {
                    title: 'Footer',
                    active: true,
                    selectors: ['#navFooter'],
                },
            }
        },

        'ebay.co.uk': {
            url: ["ebay.co.uk", "ebay.com", "ebay.fr","ebay.it","ebay.de","ebay.es",],
            active: true,
            blocked: false,
            sets: {
                a: {
                    title: 'Top Banner',
                    active: true,
                    selectors: ['.hl-banner-carousel', '.hl-banner'],
                },
                b: {
                    title: 'Recommended',
                    active: true,
                    selectors: ['.hl-module'],
                },
                c: {
                    title: 'Footer',
                    active: true,
                    selectors: ['footer', '#hlGlobalFooter'],
                },
            }
        },

        'twitter.com': {
            url: ["twitter.com",],
            active: true,
            blocked: false,
            sets: {
                a: {
                    title: 'Feed',
                    active: true,
                    selectors: ['[role="main"]#timeline .stream-container', '[aria-label="Timeline: Your Home Timeline"] '],
                },
                b: {
                    title: 'Left Menu',
                    active: true,
                    selectors: ['#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > header > div > div'],
                },
                c: {
                    title: 'Right Column',
                    active: true,
                    selectors: ['[aria-label="Timeline: Trending now"]','[aria-label="Who to follow"]','[aria-label="Footer"]','[role=complementary]',
                    '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-aqfbo4.r-zso239.r-1hycxz > div > div.css-1dbjc4n.r-1xcajam.r-ipm5af.r-1hycxz > div > div > div > div:nth-child(3)',
                    '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > main > div > div > div > div.css-1dbjc4n.r-aqfbo4.r-zso239.r-1hycxz > div > div.css-1dbjc4n.r-1xcajam.r-ipm5af.r-1hycxz > div > div > div > div.css-1dbjc4n.r-x572qd.r-1d6w8o1.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1bro5k0.r-1udh08x'
                ],
                },
                d: {
                    title: 'Messages',
                    active: true,
                    selectors: ['[testid="DMDrawer"]','#layers'],
                },
            }
        },

        'netflix.com': {
            url: ["netflix.vom"],
            active: true,
            blocked: false,
            sets: {
                a: {
                    title: 'Featured Trailer',
                    active: true,
                    selectors: ['.billboard-row', '[aria-label="Featured Content"]'],
                },
                b: {
                    title: 'Continue Watching',
                    active: true,
                    selectors: ["[data-list-context='continueWatching']"],
                },
                c: {
                    title: 'My List',
                    active: true,
                    selectors: ["[data-list-context='queue']"],
                },
                d: {
                    title: 'Recently Added',
                    active: true,
                    selectors: ["[data-list-context='recentlyAdded']"],
                },
                e: {
                    title: 'Recomendations',
                    active: true,
                    selectors: ["[data-list-context='genre']", ".lolomoRow:not([data-list-context='recentlyAdded']):not([data-list-context='queue']):not([data-list-context='continueWatching'])"],
                },
            }
        }

    }
}

