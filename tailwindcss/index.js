const plugin = require('tailwindcss/plugin');
const { colors } = require('tailwindcss/defaultTheme');
const { divide, flatten, resetText, quote } = require('@vue-interface/tailwindcss/utils');

module.exports = plugin(function({ addComponents, theme }) {
    const tooltipTop = {
        '.bs-tooltip-top': {
            padding: `${theme('tooltip.arrow.height')} 0`,
        },

        '.bs-tooltip-top .tooltip-arrow': {
            bottom: 0,
        },
            
        '.bs-tooltip-top .tooltip-arrow::before': {
            top: 0,
            borderWidth: `${theme('tooltip.arrow.height')} ${divide(theme('tooltip.arrow.width'), 2)} 0`,
            borderTopColor: theme('tooltip.arrow.color'),
        }
    };

    const tooltipBottom = {
        '.bs-tooltip-bottom': {
            padding: `${theme('tooltip.arrow.height')} 0`,
        },
        
        '.bs-tooltip-bottom .tooltip-arrow': {
            top: 0
        },
        
        '.bs-tooltip-bottom .tooltip-arrow::before': {
            bottom: 0,
            borderWidth: `0 ${divide(theme('tooltip.arrow.width'), 2)} ${theme('tooltip.arrow.height')}`,
            borderBottomColor: theme('tooltip.arrow.color'),
        },
    };

    const tooltipLeft = {
        '.bs-tooltip-left': {
            padding: `0 ${theme('tooltip.arrow.height')}`
        },
        
        '.bs-tooltip-left .tooltip-arrow': {
            right: 0,
            width: theme('tooltip.arrow.height'),
            height: theme('tooltip.arrow.width')
        },
        
        '.bs-tooltip-left .tooltip-arrow::before': {
            left: 0,
            borderWidth: `${divide(theme('tooltip.arrow.width'), 2)} 0 ${divide(theme('tooltip.arrow.width'), 2)} ${theme('tooltip.arrow.height')}`,
            borderLeftColor: theme('tooltip.arrow.color')
        }
    };

    const tooltipRight = {
        '.bs-tooltip-right': {
            padding: `0 ${theme('tooltip.arrow.height')}`
        },
        
        '.bs-tooltip-right .tooltip-arrow': {
            left: 0,
            width: theme('tooltip.arrow.height'),
            height: theme('tooltip.arrow.width'),
        },
        
        '.bs-tooltip-right .tooltip-arrow::before': {
            right: 0,
            borderWidth: `${divide(theme('tooltip.arrow.width'), 2)} ${theme('tooltip.arrow.height')} ${divide(theme('tooltip.arrow.width'), 2)} 0`,
            borderRightColor: theme('tooltip.arrow.color'),
        }
    };

    const tooltip = {
        ':root': flatten(theme('tooltip'), '--tooltip-'),
        
        // Base class
        '.tooltip': resetText({
            position: 'absolute',
            zIndex: theme('tooltip.zIndex'),
            display: 'block',
            margin: theme('tooltip.margin'),
            // Our parent element can be arbitrary since tooltips are by default inserted as a sibling of their target element.
            // So reset our font and text properties to avoid inheriting weird values.
            fontSize: theme('tooltip.fontSize'),
            // Allow breaking very long words so they don't overflow the tooltip's bounds
            wordWrap: 'break-word',
            opacity: 0,
        }, theme),
        
        '.tooltip.show': { opacity: theme('tooltip.opacity') },
        
        '.tooltip .tooltip-arrow': {
            position: 'absolute',
            display: 'block',
            width: theme('tooltip.arrow.width'),
            height: theme('tooltip.arrow.height'),
        },
        
        '.tooltip .tooltip-arrow::before': {
            position: 'absolute',
            content: quote(""),
            borderColor: 'transparent',
            borderStyle: 'solid',
        },
        
        ...tooltipTop,
        ...tooltipBottom,
        ...tooltipLeft,
        ...tooltipRight,
            
        '.bs-tooltip-auto[x-placement^="top"]': {
            ...tooltipTop
        },

        '.bs-tooltip-auto[x-placement^="bottom"]': {
            ...tooltipBottom
        },

        '.bs-tooltip-auto[x-placement^="left"]': {
            ...tooltipLeft
        },

        '.bs-tooltip-auto[x-placement^="right"]': {
            ...tooltipRight
        },
        
        // Wrapper for the tooltip content
        '.tooltip-inner': {
            maxWidth: theme('tooltip.maxWidth'),
            padding: `${theme('tooltip.paddingY')} ${theme('tooltip.paddingX')}`,
            color: theme('tooltip.color'),
            textAlign: 'center',
            backgroundColor: theme('tooltip.backgroundColor'),
            borderRadius: theme('tooltip.borderRadius')
        }  
    };

    addComponents(tooltip);
}, {
    theme: {
        tooltip: theme => {
            return {
                fontSize: theme('interface.fontSize.sm', '.875rem'),
                maxWidth: '200px',
                color: theme('colors.white', colors.white),
                backgroundColor: theme('colors.black', colors.black),
                borderRadius: theme('interface.borderRadius.base', '.25rem'),
                opacity: .9,
                paddingY: divide(theme('interface.spacer', '1rem'), 4),
                paddingX: divide(theme('interface.spacer', '1rem'), 2),
                margin: 0,
                zIndex: theme('interface.zIndex.tooltip', 1070),
                
                arrow: {
                    width: '.8rem',
                    height: '.4rem',
                    color: theme('colors.black', colors.black),
                },
                
            };
        }
    }
});