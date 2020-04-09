
const title    = 'Rent My Tent';
const subtitle = 'No tent left behind!';
const imageSm  = 'src/images/favicon/android-chrome-192x192.png';
const imageLg  = 'src/images/favicon/android-chrome-256x256.png';

const stageUrl = 'https://rent-my-tent.org'; // No trailing slash
const prodUrl  = 'https://rent-my-tent.org'; // No trailing slash
const currentUrl = stageUrl;

const site = {
    title           : title,
    titleTemplate   : `%s · ${title}`,
    desc            : 'Rent Tents on the Ethereum Blockchain!',
    author          : 'Rent-My-Tent-Team',
    twitterUsername : '@RentMyTent',
    url             : currentUrl,
    logoUrl         : imageSm,
    image           : imageSm,
};

const manifest = {
    name            : title,
    shortName       : subtitle, // max 12 characters
    startUrl        : currentUrl,
    backgroundColor : '#343434',
    themeColor      : '#EC407A',
    display         : 'standalone',
    icon            : imageLg, // This path is relative to the root of the site.
};

module.exports = {
    site,
    manifest,

    pathPrefix: '/',

    // social
    socialLinks: [
        {
            icon: 'fa-github',
            name: 'Github',
            url: 'https://github.com/robsecord/RentMyTentEth',
        },
        // {
        //     icon: 'fa-twitter',
        //     name: 'Twitter',
        //     url: 'https://twitter.com/[__your_social_link__]',
        // },
        // {
        //     icon: 'fa-facebook',
        //     name: 'Facebook',
        //     url: 'https://facebook.com/[__your_social_link__]',
        // },
        // {
        //     icon: 'fa-envelope-o',
        //     name: 'Email',
        //     url: 'mailto:[__your_email_address__]',
        // },
    ],
};
