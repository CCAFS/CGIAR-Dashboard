window.onload = function () {
    console.log('Snap')
    var snp = Snap('#svg-interactive');
    /**
     * background 
     */

    var trainees_bg_1 = snp.select('#trainees_bg_1');
    var trainees_bg_2 = snp.select('#trainees_bg_2');
    var trainees_1 = snp.select('#trainees_1');
    var trainees_2 = snp.select('#trainees_2');

    var trainees_group = snp.group(trainees_bg_1, trainees_bg_2, trainees_1, trainees_2);
    trainees_group.attr({ style: 'cursor: default' });


    var innovations_stg1_bg_1 = snp.select('#innovations_stg1_bg_1');
    var innovations_stg1_bg_2 = snp.select('#innovations_stg1_bg_2');
    var innovations_stg1_1 = snp.select('#innovations_stg1_1');
    var innovations_stg1_2 = snp.select('#innovations_stg1_2');

    var innovations_stg1_group = snp.group(innovations_stg1_bg_1, innovations_stg1_bg_2, innovations_stg1_1, innovations_stg1_2);
    innovations_stg1_group.attr({ style: 'cursor: default' });


    var innovations_stg2_bg_1 = snp.select('#innovations_stg2_bg_1');
    var innovations_stg2_bg_2 = snp.select('#innovations_stg2_bg_2');
    var innovations_stg2_1 = snp.select('#innovations_stg2_1');
    var innovations_stg2_2 = snp.select('#innovations_stg2_2');

    var innovations_stg2_group = snp.group(innovations_stg2_bg_1, innovations_stg2_bg_2, innovations_stg2_1, innovations_stg2_2);
    innovations_stg2_group.attr({ style: 'cursor: default' });

    var innovations_stg3_bg_1 = snp.select('#innovations_stg3_bg_1');
    var innovations_stg3_bg_2 = snp.select('#innovations_stg3_bg_2');
    var innovations_stg3_1 = snp.select('#innovations_stg3_1');
    var innovations_stg3_2 = snp.select('#innovations_stg3_2');

    var innovations_stg3_group = snp.group(innovations_stg3_bg_1, innovations_stg3_bg_2, innovations_stg3_1, innovations_stg3_2);
    innovations_stg3_group.attr({ style: 'cursor: default' });

    var innovations_stg4_bg_1 = snp.select('#innovations_stg4_bg_1');
    var innovations_stg4_bg_2 = snp.select('#innovations_stg4_bg_2');
    var innovations_stg4_1 = snp.select('#innovations_stg4_1');
    var innovations_stg4_2 = snp.select('#innovations_stg4_2');

    var innovations_stg4_group = snp.group(innovations_stg4_bg_1, innovations_stg4_bg_2, innovations_stg4_1, innovations_stg4_2);
    innovations_stg4_group.attr({ style: 'cursor: default' });





    var publications_bg_1 = snp.select('#publications_bg_1');
    var publications_bg_2 = snp.select('#publications_bg_2');
    var publications_1 = snp.select('#publications_1');
    var publications_2 = snp.select('#publications_2');
    var publications_3 = snp.select('#publications_3');

    var publications_group = snp.group(publications_bg_1, publications_bg_2, publications_1, publications_2, publications_3);
    publications_group.attr({ style: 'cursor: default' });

    var milestones_bg_1 = snp.select('#milestones_bg_1');
    var milestones_bg_2 = snp.select('#milestones_bg_2');
    var milestones_1 = snp.select('#milestones_1');

    var milestones_group = snp.group(milestones_bg_2, milestones_bg_1, milestones_1);
    milestones_group.attr({ style: 'cursor: default' });


    var oicr_bg_1 = snp.select('#oicr_bg_1');
    var oicr_bg_2 = snp.select('#oicr_bg_2');
    // var oicr_bg = snp.group(oicr_bg_1, oicr_bg_2);

    var oicr_level1_bg = snp.select('#oicr_level1_bg');
    var oicr_level1_1 = snp.select('#oicr_level1_1');
    var oicr_level1_2 = snp.select('#oicr_level1_2');
    var oicr_level1_3 = snp.select('#oicr_level1_3');

    var oicr_level1_group = snp.group(oicr_level1_bg, oicr_level1_1, oicr_level1_2, oicr_level1_3);
    oicr_level1_group.attr({ style: 'cursor: default' });

    var oicr_level2_bg = snp.select('#oicr_level2_bg');
    var oicr_level2_1 = snp.select('#oicr_level2_1');
    var oicr_level2_2 = snp.select('#oicr_level2_2');
    var oicr_level2_3 = snp.select('#oicr_level2_3');

    var oicr_level2_group = snp.group(oicr_level2_bg, oicr_level2_1, oicr_level2_2, oicr_level2_3);
    oicr_level2_group.attr({ style: 'cursor: default' });

    var oicr_level3 = snp.select('#oicr_level3');
    var oicr_title_1 = snp.select('#oicr_title_1');
    var oicr_title_2 = snp.select('#oicr_title_2');
    var oicr_title_3 = snp.select('#oicr_title_3');

    var oicr_level3_group = snp.group(oicr_level3, oicr_title_1, oicr_title_2, oicr_title_3);
    oicr_level3_group.attr({ style: 'cursor: default' });



    var pjs_ben_bg = snp.select('#pjs_ben');
    var pjs_ben_ellp = snp.select('#pjs_ben_ellp');
    var pjs_ben_1 = snp.select('#pjs_ben_1');
    var pjs_ben_2 = snp.select('#pjs_ben_2');
    var pjs_ben_3 = snp.select('#pjs_ben_3');

    var pjs_ben_group = snp.group(pjs_ben_bg, pjs_ben_ellp, pjs_ben_1, pjs_ben_2, pjs_ben_3);
    pjs_ben_group.attr({ style: 'cursor: default; opacity: .7' });



    var policies_lvl3_bg = snp.select('#policies_lvl3_bg');
    var policies_lvl3_1 = snp.select('#policies_lvl3_1');
    var policies_lvl3_2 = snp.select('#policies_lvl3_2');

    var policies_lvl3_group = snp.group(policies_lvl3_bg, policies_lvl3_1, policies_lvl3_2);
    policies_lvl3_group.attr({ style: 'cursor: default;' });


    var policies_lvl2_bg = snp.select('#policies_lvl2_bg');
    var policies_lvl2_1 = snp.select('#policies_lvl2_1');
    var policies_lvl2_2 = snp.select('#policies_lvl2_2');

    var policies_lvl2_group = snp.group(policies_lvl2_bg, policies_lvl2_1, policies_lvl2_2);
    policies_lvl2_group.attr({ style: 'cursor: default;' });

    var policies_lvl1_bg = snp.select('#policies_lvl1_bg');
    var policies_lvl1_1 = snp.select('#policies_lvl1_1');
    var policies_lvl1_2 = snp.select('#policies_lvl1_2');

    var policies_lvl1_group = snp.group(policies_lvl1_bg, policies_lvl1_1, policies_lvl1_2);
    policies_lvl1_group.attr({ style: 'cursor: default;' });



    var almetrics_bg = snp.select('#almetrics_bg_1');
    var almetrics_bg_2 = snp.select('#almetrics_bg_2');
    // var almetrics_bg = snp.group(almetrics_bg_2, almetrics_bg_1);





    var slo_bg = snp.select('#slo_bg_1');
    var slo_bg_2 = snp.select('#slo_bg_2');

    var policies_bg = snp.select('#policies_bg');
    var policies_bg_1 = snp.select('#policies_bg_1');

    var innovations_bg = snp.select('#innovations_bg');
    var innovations_bg_1 = snp.select('#innovations_bg_1');
    // var innovations_group = snp.group(innovations_bg, innovations_bg_1);


    var red_circle_bg = snp.select('#red_circle_bg');
    var red_yellow_bg = snp.select('#red_yellow_bg');
    var red_white_bg = snp.select('#red_white_bg');


    /**
     * arrows 
     */
    var arrow_oicr_slo = snp.select('#arrow_oicr_slo');
    var arrow_head_oicr_slo = snp.select('#arrow_head_oicr_slo');
    var arrow_pjs_ben_slo = snp.select('#arrow_pjs_ben_slo');
    var arrow_head_pjs_ben_slo = snp.select('#arrow_head_pjs_ben_slo');
    var arrow_policies_slo = snp.select('#arrow_policies_slo');
    var arrow_policies2_oicr = snp.select('#arrow_policies2_oicr');
    var arrow_head_policies2_oicr = snp.select('#arrow_head_policies2_oicr');
    var arrow_policies3_oicr = snp.select('#arrow_policies3_oicr');
    var arrow_head_policies3_oicr = snp.select('#arrow_head_policies3_oicr');


    var arrow_milestones = snp.select('#LR_Edit_lines');
    var arrow_milestones_1 = snp.select('#LR_Edit_lines_1');
    // var arrow_milestones_group = snp.group(arrow_milestones, arrow_milestones_1)

    var arrow_head_milestones = snp.select('#LR_Edit_Heads');
    var arrow_publications_almetrics = snp.select('#arrow_publications_almetrics');
    var arrow_innovations_pjs = snp.select('#arrow_innovations_pjs');
    var arrow_head_innovations_pjs = snp.select('#arrow_head_innovations_pjs');
    var arrow_innovations_lvl4_oicr = snp.select('#arrow_innovations_lvl4_oicr');
    var arrow_head_innovations_lvl4_oicr = snp.select('#arrow_head_innovations_lvl4_oicr');
    var arrow_head_almetrics = snp.select('#arrow_head_almetrics');

    /**
     * titles
     */
    var partners_title = snp.select('#partners_title')




    /***
     * 
     * PhD trainees
     */

    trainees_group.hover(function () {
        overElem([this, red_white_bg]);
    }, function () {
        outElem([this, red_white_bg]);
    });



    /**
     * 
     * Innovations
     * 
     */

    innovations_stg4_group.hover(function () {
        innovations_path([this, oicr_bg_1, oicr_bg_2, partners_title], 'hover');
        chnStroke(arrow_innovations_lvl4_oicr, { width: '4px' });
    }, function () {
        innovations_path([this, oicr_bg_1, oicr_bg_2, partners_title], 'unhover')
        chnStroke(arrow_innovations_lvl4_oicr, { width: '1px' });
    });

    [innovations_stg3_group, innovations_stg2_group, innovations_stg1_group].forEach(function (inn, i) {
        inn.hover(function () {
            innovations_path([this, partners_title], 'hover');
            overElem([red_white_bg]);
            // if (i != 0) {

            // }
        }, function () {
            innovations_path([this, partners_title], 'unhover')
            outElem([red_white_bg]);
            if (i != 0) {
            }
        });
    })


    /**
     * 
     * Publicaitions
     * 
     */

    publications_group.hover(function () {
        overElem([this, red_white_bg, almetrics_bg, almetrics_bg_2]);
        chnStroke(arrow_publications_almetrics, { width: '4px' });
        arrow_head_almetrics.attr({ style: 'opacity: 0' }, mina.bounce);
        arrow_publications_almetrics.attr({ y2: '830' }, mina.bounce);
    }, function () {
        outElem([this, red_white_bg, almetrics_bg, almetrics_bg_2]);
        chnStroke(arrow_publications_almetrics, { width: '1px' });
        arrow_head_almetrics.attr({ style: 'opacity: 1' }, mina.bounce);
        arrow_publications_almetrics.attr({ y2: '834.2' }, mina.bounce);
    });

    /**
     * 
     * Milestones
     * 
     */

    milestones_group.hover(function () {
        milestones_path([this, red_yellow_bg, red_white_bg, policies_bg, policies_bg_1, innovations_bg, innovations_bg_1], 'hover');
    }, function () {
        milestones_path([this, red_yellow_bg, red_white_bg, policies_bg, policies_bg_1, innovations_bg, innovations_bg_1], 'unhover');
    });


    /**
     * 
     * OICR
     * 
     */

    oicr_level1_group.hover(function () {
        oicr_lvl3_path([this, red_yellow_bg, slo_bg, slo_bg_2,partners_title], 'hover');
    }, function () {
        oicr_lvl3_path([this, red_yellow_bg, slo_bg, slo_bg_2,partners_title], 'unhover');
    });
    oicr_level2_group.hover(function () {
        oicr_lvl3_path([this, red_yellow_bg, slo_bg, slo_bg_2,partners_title], 'hover');
    }, function () {
        oicr_lvl3_path([this, red_yellow_bg, slo_bg, slo_bg_2,partners_title], 'unhover');
    });
    oicr_level3_group.hover(function () {
        oicr_lvl3_path([this, red_circle_bg, slo_bg, slo_bg_2,partners_title], 'hover');
    }, function () {
        oicr_lvl3_path([this, red_circle_bg, slo_bg, slo_bg_2,partners_title], 'unhover');
    });

    /**
     * 
     * Project benefits
     */

    pjs_ben_group.hover(function () {
        pjs_ben_path(this, 'hover');
    }, function () {
        pjs_ben_path(this, 'unhover');
    });

    /**
     * 
     * Policies
     * 
     */

    policies_lvl3_group.hover(function () {
        policies_lvl3_path([this, red_circle_bg, slo_bg, slo_bg_2, oicr_bg_1, oicr_bg_2, partners_title], 'hover');
        chnStroke(arrow_policies3_oicr, { width: '4px' });
        oicrContainerAnimations(null, 'hover');
    }, function () {
        policies_lvl3_path([this, red_circle_bg, slo_bg, slo_bg_2, oicr_bg_1, oicr_bg_2, partners_title], 'unhover');
        chnStroke(arrow_policies3_oicr, { width: '1px' });
        oicrContainerAnimations(null, 'unhover');
    });

    policies_lvl2_group.hover(function () {
        policies_lvl3_path([this, red_circle_bg, slo_bg, slo_bg_2, oicr_bg_1, oicr_bg_2, partners_title], 'hover');
        chnStroke(arrow_policies2_oicr, { width: '4px' });
        oicrContainerAnimations(null, 'hover');
    }, function () {
        policies_lvl3_path([this, red_circle_bg, slo_bg, slo_bg_2, oicr_bg_1, oicr_bg_2, partners_title], 'unhover');
        chnStroke(arrow_policies2_oicr, { width: '1px' })
        oicrContainerAnimations(null, 'unhover');
    });

    policies_lvl1_group.hover(function () {
        policies_lvl3_path([this, red_yellow_bg, slo_bg, slo_bg_2, partners_title], 'hover');
    }, function () {
        policies_lvl3_path([this, red_yellow_bg, slo_bg, slo_bg_2, partners_title], 'unhover');
    });

    /**
     * 
     * Almetrics
     * 
     */


    almetrics_bg.hover(function () {
        overElem([this, red_yellow_bg, almetrics_bg_2]);
    }, function () {
        outElem([this, red_yellow_bg, almetrics_bg_2]);
    });

    /**
     * functions
     */

    function oicr_lvl3_path(arr, type) {
        switch (type) {
            case 'hover':
                overElem(arr);
                chnStroke(arrow_oicr_slo, { stroke: 'white', width: '4px' })
                arrow_head_oicr_slo.attr({ style: 'fill: none' })
                arrow_head_pjs_ben_slo.attr({ style: 'opacity: 0' });
                arrow_pjs_ben_slo.attr({ x2: '1310' });
                break;
            case 'unhover':
                outElem(arr)
                chnStroke(arrow_oicr_slo, { stroke: 'black' })
                arrow_head_oicr_slo.attr({ style: 'fill: black' })
                arrow_head_pjs_ben_slo.attr({ style: 'opacity: 1' })
                arrow_pjs_ben_slo.attr({ x2: '1322' }, mina.bounce);
                break;
            default:
                break;
        }
    }

    function pjs_ben_path(ev, type) {
        switch (type) {
            case 'hover':
                overElem([ev, red_circle_bg, red_yellow_bg, slo_bg, slo_bg_2]);
                chnStroke(arrow_pjs_ben_slo, { stroke: 'white', width: '4px' })
                pjs_ben_group.attr({ style: 'opacity: 1' })
                arrow_head_pjs_ben_slo.attr({ style: 'opacity: 0' })
                arrow_head_oicr_slo.attr({ style: 'fill: none' })
                arrow_pjs_ben_slo.attr({ x2: '1310' });
                break;
            case 'unhover':
                outElem([ev, red_circle_bg, red_yellow_bg, slo_bg, slo_bg_2])
                chnStroke(arrow_pjs_ben_slo, { stroke: 'black' })
                arrow_head_oicr_slo.attr({ style: 'fill: black' })
                pjs_ben_group.attr({ style: 'opacity: .7' })
                arrow_head_pjs_ben_slo.attr({ style: 'opacity: 1' })
                arrow_pjs_ben_slo.attr({ x2: '1322' }, mina.bounce);
                break;
            default:
                break;
        }

    }

    function policies_lvl3_path(arr, type) {
        switch (type) {
            case 'hover':
                overElem(arr);
                arrow_head_oicr_slo.attr({ style: 'fill: none' })
                chnStroke(arrow_policies_slo, { stroke: 'white', width: '4px' })
                break;
            case 'unhover':
                outElem(arr)
                arrow_head_oicr_slo.attr({ style: 'fill: black' })
                chnStroke(arrow_policies_slo, { stroke: 'black' })
                break;
            default:
                break;
        }

    }

    function milestones_path(arr, type) {
        switch (type) {
            case 'hover':
                overElem(arr);
                chnStroke([arrow_milestones, arrow_milestones_1], { width: '4px' });
                arrow_head_milestones.attr({ style: 'opacity: 0;' })
                arrow_milestones_1.attr({ y2: '458', x2: '888.7' });
                arrow_milestones.attr({ y1: '813.6' });
                break;
            case 'unhover':
                outElem(arr)
                chnStroke([arrow_milestones, arrow_milestones_1, arrow_head_milestones], { stroke: 'black' });
                arrow_milestones_1.attr({ y2: '453', x2: '908.7' });
                arrow_milestones.attr({ y1: '818.6' });
                break;
            default:
                break;
        }

    }

    function innovations_path(arr, type) {
        pjs_ben_path(pjs_ben_group, type)
        oicrContainerAnimations(null, type)
        switch (type) {
            case 'hover':
                overElem(arr);
                chnStroke(arrow_innovations_pjs, { stroke: 'white', width: '4px' });
                arrow_head_innovations_pjs.attr({ style: 'opacity: 0' }, mina.bounce);
                break;
            case 'unhover':
                outElem(arr)
                chnStroke(arrow_innovations_pjs, { stroke: 'black' });
                arrow_head_innovations_pjs.attr({ style: 'opacity: 1' }, mina.bounce);

                break;
            default:
                break;
        }

    }

    function oicrContainerAnimations(params, key) {
        switch (key) {
            case 'hover':
                arrow_head_policies2_oicr.attr({ style: 'opacity: 0' }, mina.bounce);
                arrow_head_policies3_oicr.attr({ style: 'opacity: 0' }, mina.bounce);

                arrow_policies2_oicr.attr({ y2: '725.5' }, mina.bounce);
                arrow_policies3_oicr.attr({ y2: '725.5' }, mina.bounce);

                arrow_head_innovations_lvl4_oicr.attr({ style: 'opacity: 0' });

                arrow_innovations_lvl4_oicr.attr({ y2: '550.5' });
                // arrow_oicr_slo.attr({ x2: '725.5' }, mina.bounce);
                break;
            case 'unhover':
                arrow_head_policies2_oicr.attr({ style: 'opacity: 1' }, mina.bounce);
                arrow_head_policies3_oicr.attr({ style: 'opacity: 1' }, mina.bounce);

                arrow_policies2_oicr.attr({ y2: '718.5' }, mina.bounce);
                arrow_policies3_oicr.attr({ y2: '718.5' }, mina.bounce);

                arrow_head_innovations_lvl4_oicr.attr({ style: 'opacity: 1' });

                arrow_innovations_lvl4_oicr.attr({ y2: '555.5' })
                break;

            default:
                break;
        }
    }





    function outElem(arr) {
        // clearTimeout(timer);

        if (arr && arr.length > 0) {
            arr.forEach(el => {
                el.animate({ transform: 's1,1' }, 700, mina.bounce);
            });
        }
    }

    function overElem(arr) {
        // clearTimeout(timer);
        arr.forEach(el => {
            el.animate({ transform: 's1.1,1.1' }, 700, mina.bounce);
        });
    }

    function chnStroke(el, params) {
        if (el.length == undefined) {
            el.attr({ style: `stroke: ${params.stroke}; stroke-width:  ${params.width}` }, mina.bounce);
        } else {
            el.forEach(element => {
                element.attr({ style: `stroke: ${params.stroke}; stroke-width:  ${params.width}` }, mina.bounce);
            });
        }
    }
    timer = setTimeout(outElem, 50)

}