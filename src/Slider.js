// @flow
import debounce from 'lodash.debounce';

import Store from './utils/Store';
import Private from './utils/Private';
import * as errors from './utils/errors';
import slide from './core/slide';

import type { SliderState } from './types/SliderState';
import type { SliderOptions } from './types/SliderOptions';
import type { SwipeDirection } from './types/SwipeDirection';
import resizeHandler from './events/resize-handler';
import resize from './core/resize';
import previous from './core/previous';
import next from './core/next';
import slideTo from './core/slide-to';
import getInnerWidth from './utils/get-inner-width';
import handleSwipe from './events/swipe-handler';
import configure from "./core/configure";
import getBreakpointOptions from './utils/get-breakpoint-options';

const _ = new Private();

const _defaultOptions: SliderOptions = {
    infinite: false,
    visibleSlides: 1,
    step: 1,
    autoplay: 0
};

const _initialState: SliderState = {
    currentSlide: 0,
    innerWidth: 0,
    totalSlides: 0,
    isNextDisabled: false,
    isPrevDisabled: false
};

/**
 * This is the main class that is used to instantiate a new slider.
 * To create a new slider, use the constructor function like
 * `new Slider($ref: HTMLElement, options: SliderOptions)`.
 */
export default class Slider {

    store: Store<SliderState>;

    /**
     * Constructor
     *
     * Creates a new instance of the slider class
     *
     * @param $ref {HTMLElement} Element that contains the slides
     * @param options {SliderOptions} Optional configuration
     */
    constructor($ref: HTMLElement, options: SliderOptions) {
        _(this).$ref = $ref;
        _(this).options = {
            ..._defaultOptions,
            ...options
        };
        _(this).$slides = _(this).$ref.querySelector('.slides');
        _(this).$arrowLeft = _(this).$ref.querySelector('.arrow-left');
        _(this).$arrowRight = _(this).$ref.querySelector('.arrow-right');

        if (!_(this).$slides || !_(this).$slides.children.length) {
            throw errors.NO_CHILDREN;
        }

        const innerWidth = getInnerWidth(_(this).$ref, _(this).$arrowLeft, _(this).$arrowRight);
        const { visibleSlides, step } = getBreakpointOptions(_(this).options, innerWidth);
        const initialState = {
            ..._initialState,
            totalSlides: _(this).$slides.children.length,
            innerWidth,
            visibleSlides,
            step
        };

        // Create the store holding the internal state and setup the slider
        _(this).store = new Store(initialState, this.handleChange);
        configure(_(this).$slides, _(this).options);
        resize(_(this).$ref, _(this).$slides, _(this).store);

        // If the left arrow exists, attach the `previous` event to it
        if (_(this).$arrowLeft) {
            _(this).$arrowLeft.addEventListener('click', previous.bind(this, _(this).$ref, _(this).$slides, _(this).store, _(this).options, false));
        }

        // If the right arrow exists, attach the `next` event to it.
        if (_(this).$arrowRight) {
            _(this).$arrowRight.addEventListener('click', next.bind(this, _(this).$ref, _(this).$slides, _(this).store, _(this).options, false));
        }

        // Resize the slider, whenever the window resizes (i.e. resize, orientation change)
        window.addEventListener('resize', debounce(
            resizeHandler.bind(this, _(this).$ref, _(this).store, _(this).options, _(this).$arrowLeft, _(this).$arrowRight),
            200
        ));

        // Swipe to a different slide, based on the direction the user swipes in
        handleSwipe(_(this).$slides, _(this).store, _(this).options, (direction: SwipeDirection) => {
            switch (direction) {
                case 'left':
                    next(_(this).$ref, _(this).$slides, _(this).store, _(this).options, false);
                    break;
                case 'right':
                    previous(_(this).$ref, _(this).$slides, _(this).store, _(this).options, false);
                    break;
                default:
                    break;
            }
        });

        // Listen for `slide` events, triggered from external scripts
        _(this).$ref.addEventListener('slide', (event: CustomEvent) => {
            const { internal, to } = event.detail;
            return internal ? null : this.toSlide(to);
        });

        // Listen for `next` events, triggered from external scripts
        _(this).$ref.addEventListener('next', (event: CustomEvent) => {
            return event.detail && event.detail.internal ? null : this.nextSlide(true);
        });

        // Listen for `previous` events, triggered from external scripts
        _(this).$ref.addEventListener('previous', (event: CustomEvent) => {
            return event.detail && event.detail.internal ? null : this.previousSlide(true);
        });

        if (_(this).options.autoplay) {
            _(this).isIntervalPaused = false;

            setInterval(() => !_(this).isIntervalPaused && this.nextSlide(), _(this).options.autoplay);

            _(this).$ref.addEventListener('mouseenter', () => {
                _(this).isIntervalPaused = true;
            });

            _(this).$ref.addEventListener('mouseleave', () => {
                _(this).isIntervalPaused = false;
            });
        }

        _(this).$ref.classList.remove('cloaked');
    }

    /**
     * Slides to the next slides.
     *
     * @public
     */
    nextSlide = (isEventTrigger: boolean = false) => {
        next(_(this).$ref, _(this).$slides, _(this).store, _(this).options, isEventTrigger);
    };

    /**
     * Slides to the previous slide.
     *
     * @public
     */
    previousSlide = (isEventTrigger: boolean = false) => {
        previous(_(this).$ref, _(this).$slides, _(this).store, _(this).options, isEventTrigger);
    };

    /**
     * Slides to a specific slide referenced by the index of the slide.
     *
     * @public
     * @param slide Slide index
     */
    toSlide = (slide: number) => {
        slideTo(_(this).store, slide);
    };

    /**
     * Override of `addEventListener` to make sure, events attached by the user are attached to `$ref`.
     *
     * @param event Eventname
     * @param handler Eventhandler
     * @param options Eventoptions
     */
    addEventListener = (event: string, handler: (event: CustomEvent) => any, options: any) => {
        _(this).$ref.addEventListener(event, handler, options);
    };

    /**
     * Override of `removeEventListener` to make sure, added events are detached the right way.
     *
     * @param event Eventname
     * @param handler Eventhandler
     */
    removeEventListener = (event: string, handler: (event: CustomEvent) => any) => {
        _(this).$ref.removeEventListener(event, handler);
    };

    /**
     * Handles updates of the data store to make the UI reflect the internal state at all times.
     *
     * @private
     * @param prevState State before the update
     */
    handleChange = (prevState: SliderState) => {
        const {
            $slides,
            store,
            options
        } = _(this);

        const {
            currentSlide,
            innerWidth
        } = store.getState();

        // Resize the slider, if the innerWidth has changed
        if (innerWidth !== prevState.innerWidth) {
            resize(_(this).$ref, $slides, store);
        }

        // Trigger the sliding animation, if the slide has changed
        if (currentSlide !== prevState.currentSlide || options.infinite) {
            slide(_(this).$ref, $slides, store);
        }
    };

    /**
     * Instantiates all sliders.
     *
     * @public
     * @static
     * @returns {Array.<Slider>} Array of initialized sliders
     */
    static init() {
        const $sliders:NodeList<HTMLElement> = document.querySelectorAll('[data-sm-slider]');
        let $refs:Array<Slider> = [];

        Array.prototype.forEach.call($sliders, ($slider: HTMLElement) => {
            const optionString: ?string = $slider.getAttribute('data-sm-slider');
            if (!optionString) {
                return;
            }

            const options = JSON.parse(optionString);
            $refs.push(new Slider($slider, options));
        });

        return $refs;
    }
}
