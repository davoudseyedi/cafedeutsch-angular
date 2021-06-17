import {trigger, state, style, animate, transition, keyframes, query, stagger, group} from "@angular/animations";

/**
 *  This class define animations for presentation layer and import to component and be used base on any animation docs.
 *
 * @type {[AnimationTriggerMetadata , AnimationTriggerMetadata , AnimationTriggerMetadata , AnimationTriggerMetadata , AnimationTriggerMetadata , AnimationTriggerMetadata , AnimationTriggerMetadata , AnimationTriggerMetadata , AnimationTriggerMetadata]}
 */
export const animation = [

    /**
     * Use near *ngIf
     * [@enterAnimation]
     */
    trigger(
        'enterAnimation', [
            transition(':enter', [
                style({transform: 'translateY(-20%)', opacity: 0}),
                animate('300ms', style({transform: 'translateY(0)', opacity: 1})),
            ]),
            transition(':leave', [
                style({transform: 'translateY(0)', opacity: 1}),
                animate('300ms', style({transform: 'translateY(-20%)', opacity: 0})),
            ]),
        ],
    ),


    /**
     * Use near *ngIf
     * [@slideRightAnimation]
     */
    trigger(
        'slideRightAnimation', [
            transition(':enter', [
                style({transform: 'translateX(-20%)', opacity: 0}),
                animate('300ms', style({transform: 'translateX(0)', opacity: 1})),
            ]),
            transition(':leave', [
                style({transform: 'translateX(0)', opacity: 1}),
                animate('50ms', style({transform: 'translateX(-20%)', opacity: 0})),
            ]),
        ],
    ),

    /**
     * Use near *ngIf
     * [@slideLeftAnimation]
     */
    trigger(
        'slideLeftAnimation', [
            transition(':enter', [
                style({transform: 'translateX(20%)', opacity: 0}),
                animate('300ms', style({transform: 'translateX(0)', opacity: 1})),
            ]),
            transition(':leave', [
                style({transform: 'translateX(0)', opacity: 1}),
                animate('50ms', style({transform: 'translateX(20%)', opacity: 0})),
            ]),
        ],
    ),

    /**
     * Use near *ngIf
     * [@fadeOutAnimation]
     */
    trigger(
        'fadeOutAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('400ms', style({ opacity: 1 })),
            ]),
            transition(':leave', [
            ]),
        ],
    ),

    /**
     * This animation use for List.
     * animate HTML left to right.
     * put selector on parent of *ngfor.
     * [@showNewList]="formItemLength"
     */
    trigger("showNewList", [
        transition("* => *", [
            query(":enter", style({ opacity: 0 }), {optional: true}),
            query(":enter", stagger("300ms", [
                animate(".5s ease-in", keyframes([
                    style({opacity: 0, transform: "translateY(-20%)"}),
                    style({opacity: 1, transform: "translateY(0)"}),
                ]))]), {optional: true}),
            query(":leave", stagger("0ms", [
                animate(".5s ease-in", keyframes([
                    style({offset: 0, opacity: 1, transform: "translateY(0)"}),
                    style({offset: 1.0, opacity: 0, transform: "translateY(-20%)"}),
                ]))]), {optional: true}),
        ]),
    ]),

    /**
     * this animation use for Show List
     *  define variables for different animation.
     *  animate left to right.
     * put selector on next to *ngfor.
     * [@flyOut]="variable"
     */
    trigger("flyOut", [
        state("in", style({opacity: 1, transform: "translateX(0)"})),
        transition("void => *", [
            style({
                opacity: 0,
                transform: "translateX(-100%)",
            }),
            animate("1s ease-in"),
        ]),
        transition("* => void", [
            animate("1s 0.1s ease-out", style({
                opacity: 0,
                transform: "translateX(100%)",
            })),
        ]),
    ]),

    /**
     * This animation use for List.
     * animate HTML left to right.
     * put selector on next to the *ngfor.
     * [@multiStep]="variable"
     */
    trigger("multiStep", [
        state("in", style({transform: "translateX(0)"})),
        transition("void => *", [
            animate(1000, keyframes([
                style({opacity: 0, transform: "translateX(-100%)"}),
                style({opacity: 1, transform: "translateX(15px)"}),
                style({opacity: 1, transform: "translateX(0)"}),
            ])),
        ]),
        transition("* => void", [
            animate(1000, keyframes([
                style({opacity: 1, transform: "translateX(0)"}),
                style({ opacity: 1, transform: "translateX(-15px)"}),
                style({ opacity: 0, transform: "translateX(100%)"}),
            ])),
        ]),
    ]),

    /**
     * This animation use for List.
     * define variables for different animation.
     * put selector on next to *ngfor.
     * [@parallelList]="variable"
     */
    trigger("parallelList", [
        state("in", style({ opacity: 1, transform: "translateX(0)", width: "25%" })),
        state("far", style({ background: "yellow", opacity: 1, transform: "translateX(0)", width: "25%"})),
        state("lei", style({ background: "red", opacity: 1, transform: "translateX(0)", width: "25%"})),
        state("mar", style({ background: "blue", opacity: 1, transform: "translateX(0)", width: "25%"})),
        transition("void => *", [
            style({opacity: 0, transform: "translateX(50px)", width: "10%"}),
            group([
                animate("0.3s 0.1s ease", style({
                    transform: "translateX(0)",
                    width: 300,
                })),
                animate("0.3s ease", style({
                    opacity: 1,
                })),
            ]),
        ]),
        transition("* => void", [
            group([
                animate("0.3s ease", style({
                    transform: "translateX(50px)",
                    width: 0,
                })),
                animate("0.3s 0.2s ease", style({
                    opacity: 0,
                })),
            ]),
        ]),
    ]),

    /**
     * This animation use for List
     *  define variables for different animation.
     * put selector on next to *ngfor.
     * [@voidState]="variable"
     */
    trigger("voidState", [
        state("inactive", style({transform: "translateX(0) scale(1)"})),
        state("active",   style({transform: "translateX(0) scale(1.1)"})),
        transition("inactive => active", animate("200ms ease-in")),
        transition("active => inactive", animate("200ms ease-out")),
        transition("void => inactive", [
            style({transform: "translateX(-100%) scale(1)"}),
            animate(200),
        ]),
        transition("inactive => void", [
            animate(200, style({transform: "translateX(100%) scale(1)"})),
        ]),
        transition("void => active", [
            style({transform: "translateX(0) scale(0"}),
            animate(400),
        ]),
        transition("active => void", [
            animate(400, style({transform: "translateX(0) scale(0)"})),
        ]),
    ]),
];
