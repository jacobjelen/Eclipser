// Default settings

const default_settings = {
    general:{ 
        active: true,
        activeTimeCheck: false,
        activeTimeFrom: '08:00',
        activeTimeTo: '17:30',
        showReminderBar: true,
    },

    domains: {
        'facebook.com': {
            url: ['facebook.com', 'fb.com'],
            active: true,
            blocked: false,
            sets: {
                feed:{
                    title:'Feed',
                    active:true,
                    selectors:['[role="feed"]','[aria-label="Stories"]','[aria-label="Create a post"]','[data-pagelet="VideoChatHomeUnit"]','[data-pagelet="VideoChatHomeUnitNoDDD"]'],
                },
                navigation:{
                    title:'Left Menu',
                    active:true,
                    selectors:['[data-pagelet="LeftRail"]'],
                },
                likes:{
                    title:'Likes & Comments',
                    active:true,
                    selectors:['div.cwj9ozl2.tvmbv18p','div.stjgntxs.ni8dbmo4.l82x9zwi.uo3d90p7.h905i5nu.monazrh9'],
                },
                chat:{
                    title:'Chat',
                    active:true,
                    selectors:['[data-pagelet="ChatTab"]'],
                },
                right:{
                    title:'Right Side Panel',
                    active:true,
                    selectors:['[data-pagelet="RightRail"]'],
                }
            }
        },
        'youtube.com': {
            url: ['youtube.com', 'youtu.be'],
            active: true,
            blocked: false,
            sets: {
                recommended:{
                    title:'Recommended Videos',
                    active:true,
                    selectors:['[page-subtype="home"] #primary','#header','#masthead-ad'],
                },
                sidemenu:{
                    title:'Side Menu',
                    active:true,
                    selectors:['#guide'],
                },
                info:{
                    title:'Video Info',
                    active:true,
                    selectors:['#info','#ticket-shelf','#merch-shelf'],
                },
                comments:{
                    title:'Comments',
                    active:true,
                    selectors:['#comments'],
                },
                upnext:{
                    title:'Related Videos',
                    active:true,
                    selectors:['#secondary','#related'],
                },
            },    
        },
        'amazon.co.uk': {
            url: ["amazon.com.br", "amazon.ca", "amazon.com.mx", "amazon.com", "amazon.cn", "amazon.in", "amazon.co.jp", "amazon.sg", "amazon.ae", "amazon.sa", "amazon.fr", "amazon.de", "amazon.it", "amazon.nl", "amazon.pl", "amazon.es", "amazon.se", "amazon.com.tr", "amazon.co.uk", "amazon.com.au"],
            active: true,
            blocked: false,
            sets: {
                recomendations:{
                    title:'All Recomendations',
                    active:true,
                    selectors:['#gw-layout'],
                },
                banner:{
                    title:'Top Banner',
                    active:true,
                    selectors:['#desktop-banner'],
                },
                history:{
                    title:'Inspired by your browsing',
                    active:true,
                    selectors:['#rhf'],
                },
                footer:{
                    title:'Footer',
                    active:true,
                    selectors:['#navFooter'],
                },
            }    
        },
        'netflix.com': {
            url: ["netflix.vom"],
            active: true,
            blocked: false,
            sets: {
                trailer:{
                    title:'Featured Trailer',
                    active:true,
                    selectors:['.billboard-row', '[aria-label="Featured Content"]'],
                },
                continue:{
                    title:'Continue Watching',
                    active:true,
                    selectors:["[data-list-context='continueWatching']"],
                },
                recommended:{
                    title:'Recomendations',
                    active:true,
                    selectors:["[data-list-context='genre']", '.lolomoRow'],
                },
            }    
        }

    }
} 

