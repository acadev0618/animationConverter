export default {
    namespaced: true,
    state: {
        custom: [
            {
                style: {
                    fontSize: '28px',
                    fontWeight: 800,
                    fontStyle: 'normal'
                },
                text: 'Add a Heading',
                html: '<div style="font-size: 28px; font-weight: 800; font-style: normal">Add a Heading</div>',
            },
            {
                style: {
                    fontSize: '22px',
                    fontWeight: 600,
                    fontStyle: 'normal'
                },
                text: 'Add a Subheading',
                html: '<div style="font-size: 22px; font-weight: 600; font-style: normal">Add a Subheading</div>',
            },
            {
                style: {
                    fontSize: '15px',
                    fontWeight: 400,
                    fontStyle: 'normal'
                },
                text: 'Add a body text',
                html: '<div style="font-size: 15px; font-weight: 400; font-style: normal">Add a body text</div>',
            }
        ],
        static: [
            {
                width: 350,
                previewImage: '//cdn.bannersnack.com/banners/bxjlw988t/images/png',
                html: '' +
                    '<div style="font-size: 34px; text-align: center; line-height: 1.4; font-style:normal; font-weight:600;">' +
                        '<strong style="font-style:normal;">Joanne Rochester</strong>' +
                    '</div>' +
                    '<div style="font-size: 16px; text-align: center; line-height: 1.4;">' +
                    '<span style="letter-spacing: 6px;">JEWELRY BOUTIQUE</span>' +
                    '</div>',
                style: {
                }
            },
            {
                width: 370,
                previewImage: '//cdn.bannersnack.com/banners/bciqb5aak/images/png',
                html: '<div style="font-size: 54px; text-align: center; line-height: 1.1;">' +
                    '<span style="letter-spacing: 0px; text-transform: uppercase;">EXQUISITE TASTE</span>' +
                    '</div>' +
                    '<div style="font-size: 12px; text-align: center; line-height: 1.4;">' +
                    '<span style="letter-spacing: 5px;">ACCESSORIES FOR MEN</span>' +
                    '</div>',
                style: {
                }
            },
        ]
    }
}
