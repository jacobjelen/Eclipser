// Default settings

const default_settings = {
    general:{ 
        active: true,
        activeFrom: '',
        activeTo: '',
        show_bar: true,
    },

    domains: {
        'facebook.com': {
            url: ['facebook.com', 'fb.com'],
            active: true,
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
        'brainjar.com': {
            active: true,
            sets: {
                set1:{
                    title:'Set 1',
                    active:true,
                    selectors:['body>p'],
                },
                set3:{
                    title:'Set 3',
                    active:true,
                    selectors:['body>p'],
                },
                set21:{
                    title:'Set 21',
                    active:true,
                    selectors:['body>p'],
                },
                set8:{
                    title:'Set 8',
                    active:true,
                    selectors:['body>p'],
                },
            }    
        }

    }
} 

