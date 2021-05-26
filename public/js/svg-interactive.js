window.onload = function () {
    // console.log('Snap');
    var snp = Snap('#svg-interactive');

    //     /**** spheres *****/
    var allTerms = snp.selectAll('g');
    var parent = window.parent.document;
    var clearFilterButton = parent.querySelector('.clearFilterBtn');
    $(clearFilterButton).attr({ style: 'cursor: pointer' });

    var sphere_title_1 = snp.select('#tl_1');
    var sphere_title_2 = snp.select('#tl_2');
    var sphere_title_3 = snp.select('#tl_3');
    var sphere_red_bg = snp.select('#sphere_red_bg');
    var sphere_yellow_bg = snp.select('#sphere_yellow_bg');
    var sphere_white_bg = snp.select('#sphere_white_bg');

    var trainees_group = snp.select('#ly_ppl_trained');
    trainees_group.attr({ style: 'cursor: default' });

    var bg_publications = snp.select('#bg_publications');
    var publications_group = snp.select('#ly_publications');
    publications_group.attr({ style: 'cursor: default' });

    var almetrics_bg = snp.select('#ly_almetric');
    var tl_partnertships = snp.select('#tl_partnertships');
    tl_partnertships.attr({ style: 'cursor: pointer' });

    var milestones_group = snp.select('#ly_milestones');
    milestones_group.attr({ style: 'cursor: default' });

    var ly_policies = snp.select('#ly_policies');
    ly_policies.attr({ style: 'cursor: pointer' });
    var ly_innovations = snp.select('#ly_innovations');
    ly_innovations.attr({ style: 'cursor: pointer' });

    var ly_slo = snp.select('#ly_slo');
    ly_slo.attr({ style: 'cursor: pointer' });
    var tl_slo = snp.select('#tl_slo');


    var ly_oicr = snp.select('#ly_oicr');
    ly_oicr.attr({ style: 'cursor: pointer' });
    var ly_pjts_benfs = snp.select('#ly_ptjs_benfs');
    ly_pjts_benfs.attr({ style: 'cursor: pointer' });

    var txt_levels_bg = snp.select('#txt_levels_bg');

    var ly_innovations_txts = snp.select('#ly_innovations_txts');
    var bg_innovations_txts = snp.select('#bg_innovations_txts');
    var bg_innovations = snp.select('#bg_innovations');
    var icon_innovations = snp.select('#icon_innovations');
    var ic_innovations = snp.select('#ic_innovations');
    var ic_innovations_bg = snp.select('#ic_innovations_bg');

    var bg_stage1_innovations = snp.select('#bg_stage1_innovations');
    var tl_stage1_innovations = snp.select('#tl_stage1_innovations');
    var stage1_innovations_group = snp.group(bg_stage1_innovations, tl_stage1_innovations);
    stage1_innovations_group.attr({ style: 'cursor: pointer' });

    var txt_stage1_innovations = snp.select('#txt_stage1_innovations');

    var bg_stage2_innovations = snp.select('#bg_stage2_innovations');
    var tl_stage2_innovations = snp.select('#tl_stage2_innovations');
    var stage2_innovations_group = snp.group(bg_stage2_innovations, tl_stage2_innovations);
    stage2_innovations_group.attr({ style: 'cursor: pointer' });

    var txt_stage2_innovations = snp.select('#txt_stage2_innovations');

    var bg_stage3_innovations = snp.select('#bg_stage3_innovations');
    var tl_stage3_innovations = snp.select('#tl_stage3_innovations');
    var stage3_innovations_group = snp.group(bg_stage3_innovations, tl_stage3_innovations);
    stage3_innovations_group.attr({ style: 'cursor: pointer' });

    var txt_stage3_innovations = snp.select('#txt_stage3_innovations');


    var bg_stage4_innovations = snp.select('#bg_stage4_innovations');
    var tl_stage4_innovations = snp.select('#tl_stage4_innovations');
    var stage4_innovations_group = snp.group(bg_stage4_innovations, tl_stage4_innovations);
    stage4_innovations_group.attr({ style: 'cursor: pointer' });

    var txt_stage4_innovations = snp.select('#txt_stage4_innovations');



    var bg_oicr = snp.select('#bg_oicr');
    var icon_oicr = snp.select('#icon_oicr');
    var ic_oicr = snp.select('#ic_oicr');
    var ic_oicr_bg = snp.select('#ic_oicr_bg');
    var ly_oicr_txts = snp.select('#ly_oicr_txts');
    var bg_oicr_txts = snp.select('#bg_oicr_txts');


    var bg_level1_oicr = snp.select('#bg_level1_oicr');
    var tl_level1_oicr = snp.select('#tl_level1_oicr');
    var level1_oicr_group = snp.group(bg_level1_oicr, tl_level1_oicr);
    level1_oicr_group.attr({ style: 'cursor: pointer' });

    var txt_level1_oicr = snp.select('#txt_level1_oicr');


    var bg_level2_oicr = snp.select('#bg_level2_oicr');
    var tl_level2_oicr = snp.select('#tl_level2_oicr');
    var level2_oicr_group = snp.group(bg_level2_oicr, tl_level2_oicr);
    level2_oicr_group.attr({ style: 'cursor: pointer' });

    var txt_level2_oicr = snp.select('#txt_level2_oicr');

    var bg_level3_oicr = snp.select('#bg_level3_oicr');
    var tl_level3_oicr = snp.select('#tl_level3_oicr');
    var level3_oicr_group = snp.group(bg_level3_oicr, tl_level3_oicr);
    level3_oicr_group.attr({ style: 'cursor: pointer' });

    var txt_level3_oicr = snp.select('#txt_level3_oicr');

    var bg_policies = snp.select('#bg_policies');
    var icon_policies = snp.select('#icon_policies');
    var ic_policies = snp.select('#ic_policies');
    var ic_policies_bg = snp.select('#ic_policies_bg');
    var ly_policies_txts = snp.select('#ly_policies_txts');
    var bg_policies_txts = snp.select('#bg_policies_txts');

    var bg_level1_policies = snp.select('#bg_level1_policies');
    var tl_level1_policies = snp.select('#tl_level1_policies');
    var level1_policies_group = snp.group(bg_level1_policies, tl_level1_policies);
    level1_policies_group.attr({ style: 'cursor: pointer' });

    var txt_level1_policies = snp.select('#txt_level1_policies');

    var bg_level2_policies = snp.select('#bg_level2_policies');
    var tl_level2_policies = snp.select('#tl_level2_policies');
    var level2_policies_group = snp.group(bg_level2_policies, tl_level2_policies);
    level2_policies_group.attr({ style: 'cursor: pointer' });

    var txt_level2_policies = snp.select('#txt_level2_policies');

    var bg_level3_policies = snp.select('#bg_level3_policies');
    var tl_level3_policies = snp.select('#tl_level3_policies');
    var level3_policies_group = snp.group(bg_level3_policies, tl_level3_policies);
    level3_policies_group.attr({ style: 'cursor: pointer' });

    var txt_level3_policies = snp.select('#txt_level3_policies');



    /**
    * arrows 
    */


    var arrow_innovations_pjts = snp.select('#arrow_innovations_pjts');
    var arrow_ptjs_benfs_slo = snp.select('#arrow_pjts_slo');
    var arrow_publications_almetrics = snp.select('#arrow_publications_almetric');
    var arrow_milestones_policies = snp.select('#arrow_milestones_policies');
    var arrow_milestones_innovations = snp.select('#arrow_milestones_innovations');
    var arrow_slo = snp.select('#arrow_slo');
    var arrow_innovations_stage4_oicr = snp.select('#arrow_innovations_stage4_oicr');
    var arrow_policies_level2_oicr = snp.select('#arrow_policies_level2_oicr');
    var arrow_policies_level3_oicr = snp.select('#arrow_policies_level3_oicr');
    var arrow_policies_slo = snp.select('#arrow_policies_slo');
    var arrow_oicr_slo = snp.select('#arrow_oicr_slo');


    /***
    * 
    * SLO 
    */

    ly_slo.hover(function () {
        // overElem([this])
        this.attr({ style: 'cursor: pointer' });
    }, function () {
        // outElem([this])
        this.attr({ style: 'cursor: default' });
    });

    // ly_slo.click(function () {
    //     window.open('https://www.cgiar.org/annual-report/performance-report-2019/our-contribution-to-sustainable-development/');
    // });

    /***
    * 
    * PhD trainees
    */
    $(clearFilterButton).click(function () {
        allTerms.attr({ fill: '' });
    });

    sphere_title_1.hover(function () {
        this.attr({ style: 'cursor: pointer' });
    });

    sphere_title_1.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: '#00a0b0' });
    });

    sphere_title_2.hover(function () {
        this.attr({ style: 'cursor: pointer' });
    });

    sphere_title_2.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: 'white' });
    });
    
    sphere_title_3.hover(function () {
        this.attr({ style: 'cursor: pointer' });
    });

    sphere_title_3.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: 'white' });
    });

    trainees_group.hover(function () {
        this.attr({ style: 'cursor: pointer' });
        overElem([this, tl_partnertships]);
        sphere_white_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
    }, function () {
        this.attr({ style: 'cursor: default' });
        outElem([this, tl_partnertships]);
        sphere_white_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
    });

    trainees_group.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: '#00a0b0' });
    });

    ly_innovations.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: '#00a0b0' });
    });

    ly_pjts_benfs.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: '#00a0b0' });
    });

    ly_slo.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: '#00a0b0' });
    });

    tl_partnertships.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: '#00a0b0' });
    });

    publications_group.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: '#00a0b0' });
    });

    milestones_group.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: '#00a0b0' });
    });

    ly_oicr.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: 'white' });
    });

    almetrics_bg.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: '#00a0b0' });
    });

    ly_policies.click(function () {
        allTerms.attr({ fill: '' });
        this.attr({ fill: 'white' });
    });

    // trainees_group.click(function () {
    //     window.open('https://www.cgiar.org/annual-report/performance-report-2019/capacity-development/');
    // });

    /**
    * 
    * Partnerships
    * 
    */

    // tl_partnertships.hover(function () {
    //     this.attr({ style: 'cursor: pointer' });
    // }, function () {
    //     this.attr({ style: 'cursor: default' });
    // });


    // tl_partnertships.click(function () {
    //     window.open(' https://www.cgiar.org/annual-report/performance-report-2019/partnerships/');
    // });




    /**
    * 
    * Publications
    * 
    */

    publications_group.hover(function () {
        overElem([this, almetrics_bg, tl_partnertships]);
        sphere_white_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        chnStroke(arrow_publications_almetrics, { width: '3px' });
        arrow_publications_almetrics.animate({ transform: 's.5,.9' }, 700, mina.bounce);

        this.attr({ style: 'cursor: pointer' });
    }, function () {
        outElem([this, almetrics_bg, tl_partnertships]);
        sphere_white_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        chnStroke(arrow_publications_almetrics, { width: '1px' });
        arrow_publications_almetrics.animate({ transform: 's1,1' }, 700, mina.bounce);
        this.attr({ style: 'cursor: default' });
    });
    // publications_group.click(function () {
    //     window.open('https://www.cgiar.org/annual-report/performance-report-2019/peer-reviewed-publications/');
    // });

    /**
    * 
    * Almetrics
    * 
    */


    almetrics_bg.hover(function () {
        overElem([this])
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        arrow_publications_almetrics.animate({ transform: 's1.1,.95' }, 700, mina.bounce);

        this.attr({ style: 'cursor: pointer' });
    }, function () {
        outElem([this]);
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_publications_almetrics.animate({ transform: 's1,1' }, 700, mina.bounce);

        this.attr({ style: 'cursor: default' });
    });

    // almetrics_bg.click(function () {
    //     window.open('https://www.cgiar.org/annual-report/performance-report-2019/altmetric-attention-scores/');
    // });


    /**
    * 
    * Milestones
    * 
    */
    // chnStroke(arrow_milestones_policies, { stroke: '#293247', width: '2' })
    // chnStroke(// arrow_milestones_innovations, { stroke: '#293247', width: '2' })

    milestones_group.hover(function () {
        overElem([this, ly_policies, ly_innovations, tl_partnertships]);
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        sphere_white_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        arrow_milestones_policies.animate({ transform: 's1,.85', opacity: '1' }, 700, mina.bounce);
        arrow_milestones_innovations.animate({ transform: 's1,.83' }, 700, mina.bounce);
        arrow_policies_slo.animate({ transform: 's.92,1t8' }, 700, mina.bounce);

        chnStroke(arrow_milestones_innovations, { opacity: '1' })
        this.attr({ style: 'cursor: pointer' });

    }, function () {
        arrow_milestones_policies.animate({ transform: 's1,1', opacity: '0.2' }, 700, mina.bounce);
        outElem([this, ly_policies, ly_innovations, tl_partnertships]);
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        sphere_white_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_milestones_innovations.animate({ transform: 's1,1', opacity: '0.2' }, 700, mina.bounce);
        arrow_policies_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        this.attr({ style: 'cursor: default' });

    });

    // milestones_group.click(function () {
    //     window.open('https://www.cgiar.org/annual-report/performance-report-2019/milestone-achievements/');
    // });


    /****
    * Project benefits
    */

    ly_pjts_benfs.hover(function () {
        overElem([this, ly_slo, tl_partnertships]);
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        sphere_red_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        chnStroke(arrow_ptjs_benfs_slo, { stroke: 'white', width: '3px', opacity: '1' });

        arrow_ptjs_benfs_slo.animate({ transform: 's.8,1' }, 700, mina.bounce);
        arrow_innovations_pjts.animate({ transform: 's.9,1' }, 700, mina.bounce);
        arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    }, function () {
        outElem([this, ly_slo, tl_partnertships]);
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        sphere_red_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        chnStroke(arrow_ptjs_benfs_slo, { stroke: '#353635', width: '2px', opacity: '0.2' });

        arrow_ptjs_benfs_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_innovations_pjts.animate({ transform: 's1,1' }, 700, mina.bounce);
    });

    // ly_pjts_benfs.click(function () {
    //     window.open('https://www.cgiar.org/annual-report/performance-report-2019/milestone-achievements/');
    // })

    /**
     * 
     * background layers
     */

    sphere_white_bg.hover(function () {
        allCirclesClose();
    }, function () {
    });

    sphere_red_bg.hover(function () {
        allCirclesClose();
    }, function () {
    });

    sphere_yellow_bg.hover(function () {
        allCirclesClose();
    }, function () {
    })

    /**
    * 
    * Innovations
    * 
    */

    ly_innovations.hover(function () {
        allCirclesClose();

        overElem([this, tl_partnertships]);
        chnStroke(arrow_ptjs_benfs_slo, { stroke: '#353635', width: '2px', opacity: '0.2' });
        chnStroke(arrow_innovations_pjts, { stroke: '#353635', width: '2px', opacity: '0.2' });


        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        sphere_white_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
    }, function () {
        outElem([this, tl_partnertships]);
        
        
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        sphere_white_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
    });
    
    icon_innovations.hover(function () {
        allCirclesClose();
        this.attr({ style: 'cursor: pointer' });
        ic_innovations_bg.animate({ transform: 's1.5,1.5' }, 700, mina.bounce);
        ic_innovations.animate({ transform: 't0,0 r360' }, 1000, mina.bounce);
    }, function () {
        this.attr({ style: 'cursor: default' });
        ic_innovations.animate({ transform: 't0,0 r0' }, 1000, mina.bounce);
        unanimateCircles(ic_innovations_bg);
    });

    icon_innovations.click(function () {
        window.open('https://www.cgiar.org/annual-report/performance-report-2019/innovations/');
    });




    stage1_innovations_group.hover(function () {
        chnStroke([bg_stage1_innovations], { width: '3' })
    }, function () {
        chnStroke([bg_stage1_innovations], { stroke: '#F79421', width: '1' })
    })


    stage1_innovations_group.click(function () {
        overElem([ly_innovations]);
        outVisibility([stage2_innovations_group, stage3_innovations_group, stage4_innovations_group, ly_innovations, arrow_innovations_pjts, arrow_innovations_stage4_oicr]);

        stage1_innovations_group.animate({ transform: 's1.6,1.6t0,-10' }, 700, mina.bounce);
        // arrow_milestones_innovations.animate({ transform: 's1,.95t5' }, 700, mina.bounce);
        sphere_white_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        txt_stage1_innovations.animate({ opacity: '1' }, 700, mina.bounce);
        bg_innovations_txts.animate({ opacity: '1' }, 700, mina.bounce);
        bg_innovations.attr({ style: 'fill-opacity:1' });
    });

    function stage1Out() {
        outElem([sphere_white_bg, ly_innovations]);
        overVisibility([stage2_innovations_group, stage3_innovations_group, stage4_innovations_group, ly_innovations, arrow_innovations_pjts, arrow_innovations_stage4_oicr]);
        unanimateCircles(stage1_innovations_group);

        // arrow_milestones_innovations.animate({ transform: 's1,1' }, 700, mina.bounce);
        sphere_white_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        txt_stage1_innovations.animate({ opacity: '0' }, 200, mina.bounce);
        bg_innovations_txts.attr({ style: 'opacity: 0' });
        bg_innovations.attr({ style: 'fill-opacity:0.2' });
    }



    stage2_innovations_group.hover(function () {
        chnStroke([bg_stage2_innovations], { width: '3' }) 
    }, function () {
        chnStroke([bg_stage2_innovations], { stroke: '#F79421', width: '1' })

    })

    stage2_innovations_group.click(function () {
        overElem([ly_innovations]);
        outVisibility([stage1_innovations_group, stage3_innovations_group, stage4_innovations_group, ly_innovations, arrow_innovations_pjts, arrow_innovations_stage4_oicr]);

        stage2_innovations_group.animate({ transform: 's1.6,1.6t-38,-10' }, 700, mina.bounce);
        // arrow_milestones_innovations.animate({ transform: 's1,.95t5' }, 700, mina.bounce);
        sphere_white_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        txt_stage2_innovations.animate({ opacity: '1' }, 700, mina.bounce);
        bg_innovations_txts.animate({ opacity: '1' }, 700, mina.bounce);
        bg_innovations.attr({ style: 'fill-opacity:1' });
    });

    function stage2Out() {

        outElem([sphere_white_bg, ly_innovations]);
        overVisibility([stage1_innovations_group, stage3_innovations_group, stage4_innovations_group, ly_innovations, arrow_innovations_pjts, arrow_innovations_stage4_oicr]);
        unanimateCircles(stage2_innovations_group);

        // arrow_milestones_innovations.animate({ transform: 's1,1' }, 700, mina.bounce);
        sphere_white_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        txt_stage2_innovations.animate({ opacity: '0' }, 200, mina.bounce);
        bg_innovations_txts.attr({ style: 'opacity: 0' });
        bg_innovations.attr({ style: 'fill-opacity:0.2' });
    }

    stage3_innovations_group.hover(function () {
        chnStroke([bg_stage3_innovations], { width: '3' })
    }, function () {
        chnStroke([bg_stage3_innovations], { stroke: 'white', width: '1' })

    })

    stage3_innovations_group.click(function () {
        overElem([ly_innovations]);
        outVisibility([stage1_innovations_group, stage2_innovations_group, stage4_innovations_group, ly_innovations, arrow_innovations_pjts, arrow_innovations_stage4_oicr]);

        stage3_innovations_group.animate({ transform: 's1.6,1.6t-88,-10' }, 700, mina.bounce);
        // arrow_milestones_innovations.animate({ transform: 's1,.95t5' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        txt_stage3_innovations.animate({ opacity: '1' }, 700, mina.bounce);
        bg_innovations_txts.animate({ opacity: '1' }, 700, mina.bounce);
        bg_innovations.attr({ style: 'fill-opacity:1' });
    });;

    function stage3Out() {
        outElem([sphere_yellow_bg, ly_innovations]);
        outOpacity([stage1_innovations_group, stage2_innovations_group, stage4_innovations_group])
        // arrow_milestones_innovations.animate({ transform: 's1,1' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        txt_stage3_innovations.animate({ opacity: '0' }, 700, mina.bounce);
        bg_innovations.attr({ style: 'fill-opacity:0.2' });
        unanimateCircles(stage3_innovations_group);
    }

    stage4_innovations_group.click(function () {

        overElem([ly_innovations]);
        outVisibility([stage1_innovations_group, stage2_innovations_group, stage3_innovations_group, ly_innovations]);

        stage4_innovations_group.animate({ transform: 's1.6,1.6t-128,-10' }, 700, mina.bounce);
        // arrow_milestones_innovations.animate({ transform: 's1,.95t5' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        txt_stage4_innovations.animate({ opacity: '1' }, 700, mina.bounce);
        bg_innovations_txts.animate({ opacity: '1' }, 700, mina.bounce);
        bg_innovations.attr({ style: 'fill-opacity:1' });
        arrow_innovations_stage4_oicr.animate({ transform: 's.9,.9,t0,-5' }, 700, mina.bounce);
        arrow_innovations_pjts.animate({ transform: 's.9,1,t-3' }, 700, mina.bounce);
    });

    stage4_innovations_group.hover(function () {
        overElem([ly_slo, ly_pjts_benfs, ly_oicr]);
        arrow_ptjs_benfs_slo.animate({ transform: 's.8,1' }, 700, mina.bounce);
        arrow_innovations_pjts.animate({ transform: 's.9,1,t-3' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's.9,.9,t0,-5' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,.95,t0,3' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,.95,t0,3' }, 700, mina.bounce);
        arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);

        chnStroke(arrow_ptjs_benfs_slo, { stroke: 'white', width: '3px', opacity: '1' });
        chnStroke(arrow_innovations_pjts, { stroke: 'white', width: '3px', opacity: '1' });
        chnStroke(arrow_innovations_stage4_oicr, { stroke: 'white', width: '3px', opacity: '1' });
        chnStroke([bg_stage4_innovations], { width: '3' })
    }, function () {
        outElem([ly_slo, ly_pjts_benfs, ly_oicr]);
        arrow_ptjs_benfs_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_innovations_pjts.animate({ transform: 's1,1' }, 700, mina.bounce);
        // arrow_innovations_pjts.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_slo.animate({ transform: 's1,1' }, 700, mina.bounce);

        chnStroke(arrow_innovations_stage4_oicr, { stroke: 'white', width: '2px', opacity: '1' });
        chnStroke([bg_stage4_innovations], { stroke: 'white', width: '1' })
    });

    function stage4Out() {
        outElem([sphere_white_bg]);
        outOpacity([stage1_innovations_group, stage2_innovations_group, stage3_innovations_group]);
        arrow_innovations_pjts.animate({ transform: 's1,1' }, 700, mina.bounce);
        // arrow_milestones_innovations.animate({ transform: 's1,1' }, 700, mina.bounce);
        txt_stage4_innovations.animate({ opacity: '0' }, 700, mina.bounce);
        sphere_white_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        bg_innovations.attr({ style: 'fill-opacity:0.2' });
        unanimateCircles(stage4_innovations_group);
    }


    /**
     * 
     * OICR 
     *  */

    ly_oicr.hover(function () {
        overElem([this, ly_slo, tl_partnertships]);
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        sphere_red_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);

        arrow_oicr_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        arrow_slo.selectAll("line").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });


        arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's.91,1t7,0' }, 700, mina.bounce);
        arrow_ptjs_benfs_slo.animate({ transform: 's.8,1t-5,0' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,.95,t0,4' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,.95,t0,3' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's.9,.9,t0,-5' }, 700, mina.bounce);


    }, function () {
        outElem([this, ly_slo, tl_partnertships]);
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        sphere_red_bg.animate({ transform: 's1,1' }, 700, mina.bounce);

        chnStroke(arrow_slo, { stroke: '#000000', width: '2px', opacity: '1' });
        chnStroke(arrow_oicr_slo, { stroke: '#000000', width: '2px', opacity: '1' });
        arrow_oicr_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: #000000; stroke-width: 2px; opacity:1` }, mina.bounce);
        });

        arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);

        //
        // oicr_level1Out();
        // oicr_level2Out();
        // oicr_level3Out();

    });

    icon_oicr.hover(function () {
        this.attr({ style: 'cursor: pointer' });
        ic_oicr_bg.animate({ transform: 's1.5,1.5' }, 700, mina.bounce);
        ic_oicr.animate({ transform: 't0,0 r360' }, 1000, mina.bounce);
    }, function () {
        this.attr({ style: 'cursor: default' });
        ic_oicr.animate({ transform: 't0,0 r0' }, 1000, mina.bounce);
        unanimateCircles(ic_oicr_bg);
    });

    icon_oicr.click(function () {
        window.open('https://www.cgiar.org/annual-report/performance-report-2019/outcome-impact-case-reports/');
    });



    level1_oicr_group.hover(function () {
        chnStroke([bg_level1_oicr], { width: '3' })
    }, function () {
        chnStroke([bg_level1_oicr], { stroke: 'white', width: '1' })

    });

    level1_oicr_group.click(function () {
        overElem([ly_slo]);
        outVisibility([level2_oicr_group, level3_oicr_group, ly_oicr]);

        level1_oicr_group.animate({ transform: 't0,104' }, 700, mina.bounce);
        bg_oicr_txts.animate({ opacity: '1' }, 700, mina.bounce);
        txt_levels_bg.animate({ transform: 't0,0', opacity: 1 }, 700, mina.bounce);
        txt_level1_oicr.animate({ opacity: '1' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);

        arrow_oicr_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        arrow_slo.selectAll("line").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        bg_oicr.selectAll(".st55").forEach(function (e, i) {
            e.attr({ style: `opacity:1` }, mina.bounce);
        });


        arrow_ptjs_benfs_slo.animate({ transform: 's.8,1t-5,0' }, 700, mina.bounce);

        arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's.91,1t7,0' }, 700, mina.bounce);

        arrow_policies_level2_oicr.animate({ transform: 's1,.95,t0,3' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,.95,t0,3' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's.9,.9,t0,-5' }, 700, mina.bounce);
    });

    function oicr_level1Out() {
        outElem([ly_slo]);
        overVisibility([level2_oicr_group, level3_oicr_group, ly_oicr]);

        level1_oicr_group.animate({ transform: 't0,0' }, 700, mina.bounce);
        bg_oicr_txts.attr({ style: 'opacity: 0' });
        txt_levels_bg.animate({ transform: 't0,0', opacity: 0 }, 700, mina.bounce);
        txt_level1_oicr.animate({ opacity: '0' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);

        arrow_ptjs_benfs_slo.animate({ transform: 's1,1t0,0' }, 700, mina.bounce);
        arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
    }




    level2_oicr_group.hover(function () {
        chnStroke([bg_level2_oicr], { width: '3' })
    }, function () {
        chnStroke([bg_level2_oicr], { stroke: 'white', width: '1' })
    })

    level2_oicr_group.click(function () {

        overElem([ly_slo]);
        outVisibility([level1_oicr_group, level3_oicr_group, ly_oicr]);

        level2_oicr_group.animate({ transform: 't0,104' }, 700, mina.bounce);
        bg_oicr_txts.animate({ opacity: '1' }, 700, mina.bounce);
        txt_levels_bg.animate({ transform: 't80,0', opacity: 1 }, 700, mina.bounce);
        txt_level2_oicr.animate({ opacity: '1' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);

        arrow_oicr_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        arrow_slo.selectAll("line").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        bg_oicr.selectAll(".st55").forEach(function (e, i) {
            e.attr({ style: `opacity:1` }, mina.bounce);
        });


        arrow_ptjs_benfs_slo.animate({ transform: 's.8,1t-5,0' }, 700, mina.bounce);

        arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's.91,1t7,0' }, 700, mina.bounce);

        arrow_policies_level2_oicr.animate({ transform: 's1,.95,t0,3' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,.95,t0,3' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's.9,.9,t0,-5' }, 700, mina.bounce);

    });

    function oicr_level2Out() {
        outElem([ly_slo]);
        overVisibility([level1_oicr_group, level3_oicr_group, ly_oicr]);

        level2_oicr_group.animate({ transform: 't0,0' }, 700, mina.bounce);
        bg_oicr_txts.attr({ style: 'opacity: 0' });
        txt_levels_bg.animate({ transform: 't0,0', opacity: 0 }, 700, mina.bounce);
        txt_level2_oicr.animate({ opacity: '0' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);

        arrow_ptjs_benfs_slo.animate({ transform: 's1,1t0,0' }, 700, mina.bounce);
        arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
    }




    level3_oicr_group.hover(function () {
        chnStroke([bg_level3_oicr], { width: '3' })
    }, function () {
        chnStroke([bg_level3_oicr], { stroke: 'white', width: '1' })

    })

    level3_oicr_group.click(function () {
        overElem([ly_slo]);
        outVisibility([level1_oicr_group, level2_oicr_group, ly_oicr]);

        level3_oicr_group.animate({ transform: 't0,104' }, 700, mina.bounce);
        bg_oicr_txts.animate({ opacity: '1' }, 700, mina.bounce);
        txt_levels_bg.animate({ transform: 't158,0', opacity: 1 }, 700, mina.bounce);
        txt_level3_oicr.animate({ opacity: '1' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);

        arrow_oicr_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        arrow_slo.selectAll("line").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        bg_oicr.selectAll(".st55").forEach(function (e, i) {
            e.attr({ style: `opacity:1` }, mina.bounce);
        });


        arrow_ptjs_benfs_slo.animate({ transform: 's.8,1t-5,0' }, 700, mina.bounce);

        arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's.91,1t7,0' }, 700, mina.bounce);

        arrow_policies_level2_oicr.animate({ transform: 's1,.95,t0,3' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,.95,t0,3' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's.9,.9,t0,-5' }, 700, mina.bounce);
    });

    function oicr_level3Out() {
        outElem([ly_slo]);
        overVisibility([level1_oicr_group, level2_oicr_group, ly_oicr]);

        level3_oicr_group.animate({ transform: 't0,0' }, 700, mina.bounce);
        bg_oicr_txts.attr({ style: 'opacity: 0' });
        txt_levels_bg.animate({ transform: 't0,0', opacity: 0 }, 700, mina.bounce);
        txt_level3_oicr.animate({ opacity: '0' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);

        arrow_ptjs_benfs_slo.animate({ transform: 's1,1t0,0' }, 700, mina.bounce);
        arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
    }


    /**
     * 
     * Policies 
     *  */

    icon_policies.hover(function () {
        this.attr({ style: 'cursor: pointer' });
        ic_policies_bg.animate({ transform: 's1.5,1.5' }, 700, mina.bounce);
        ic_policies.animate({ transform: 't0,0 r360' }, 1000, mina.bounce);
    }, function () {
        this.attr({ style: 'cursor: default' });
        ic_policies.animate({ transform: 't0,0 r0' }, 1000, mina.bounce);
        unanimateCircles(ic_policies_bg);
    });

    icon_policies.click(function () {
        window.open('https://www.cgiar.org/annual-report/performance-report-2019/policies/');
    });

    ly_policies.hover(function () {
        overElem([this, ly_slo, ly_oicr, tl_partnertships]);
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        sphere_red_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);

        arrow_policies_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        arrow_slo.selectAll("line").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });


        arrow_slo.animate({ transform: 't-2,7' }, 700, mina.bounce);
        arrow_milestones_policies.animate({ transform: 's1,.85,t15,0' }, 700, mina.bounce);
        arrow_policies_slo.animate({ transform: 's.92,1t8' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's.91,1t7,0' }, 700, mina.bounce);
        arrow_ptjs_benfs_slo.animate({ transform: 's.8,1t-5,0' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,.95,t0,4' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,.95,t0,4' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's.9,.9,t0,-5' }, 700, mina.bounce);

    }, function () {
        outElem([this, ly_slo, ly_oicr, tl_partnertships]);
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        sphere_red_bg.animate({ transform: 's1,1' }, 700, mina.bounce);

        chnStroke(arrow_slo, { stroke: '#000000', width: '2px', opacity: '1' });
        arrow_policies_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: #000000; stroke-width: 2px; opacity:1` }, mina.bounce);
        });

        arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
        arrow_milestones_policies.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_ptjs_benfs_slo.animate({ transform: 's1,1t0,0' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);

        //
        policies_level1Out();
        policies_level2Out();
        policies_level3Out();

    });

    level1_policies_group.hover(function () {
        chnStroke([bg_level1_policies], { width: '3' })
    }, function () {
        chnStroke([bg_level1_policies], { stroke: 'white', width: '1' })

    })

    level1_policies_group.click(function () {
        overElem([ly_policies, ly_slo]);
        outVisibility([level2_policies_group, level3_policies_group, ly_policies]);

        level1_policies_group.animate({ transform: 's1.6,1.6t-8,0' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        txt_level1_policies.animate({ opacity: '1' }, 700, mina.bounce);
        bg_policies_txts.animate({ opacity: '1' }, 700, mina.bounce);
        bg_policies.attr({ style: 'fill-opacity:1' });

        arrow_policies_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        arrow_slo.selectAll("line").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });

        arrow_slo.animate({ transform: 't-2,7' }, 700, mina.bounce);
        arrow_policies_slo.animate({ transform: 's.92,1t8' }, 700, mina.bounce);
        arrow_milestones_policies.animate({ transform: 's1,.9t5' }, 700, mina.bounce);
        arrow_ptjs_benfs_slo.animate({ transform: 's.8,1t-5,0' }, 700, mina.bounce);
    });

    function policies_level1Out() {

        outElem([ly_policies, ly_slo]);
        overVisibility([level2_policies_group, level3_policies_group, ly_policies]);

        level1_policies_group.animate({ transform: 's1,1t0,0' }, 700, mina.bounce);
        sphere_yellow_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        txt_level1_policies.animate({ opacity: '0' }, 700, mina.bounce);
        bg_policies_txts.attr({ opacity: '0' });
        bg_policies.attr({ style: 'fill-opacity:0.2' });

        chnStroke(arrow_slo, { stroke: '#000000', width: '2px', opacity: '1' });
        arrow_policies_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: #000000; stroke-width: 2px; opacity:1` }, mina.bounce);
        });

        arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
        arrow_milestones_policies.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_ptjs_benfs_slo.animate({ transform: 's1,1t0,0' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);

    }


    level2_policies_group.hover(function () {
        chnStroke([bg_level2_policies], { width: '3' });
        chnStroke(arrow_policies_level2_oicr, { width: '3' });
    }, function () {
        chnStroke([bg_level2_policies], { stroke: 'white', width: '1' })
        chnStroke(arrow_policies_level2_oicr, { width: '2' });
    })

    level2_policies_group.click(function () {

        overElem([ly_policies, ly_slo]);
        outVisibility([level1_policies_group, level3_policies_group, ly_policies]);

        level2_policies_group.animate({ transform: 's1.6,1.6t-58,0' }, 700, mina.bounce);
        sphere_red_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        txt_level2_policies.animate({ opacity: '1' }, 700, mina.bounce);
        bg_policies_txts.animate({ opacity: '1' }, 700, mina.bounce);
        bg_policies.attr({ style: 'fill-opacity:1' });

        arrow_policies_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        arrow_slo.selectAll("line").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });

        arrow_slo.animate({ transform: 't-2,7' }, 700, mina.bounce);
        arrow_policies_slo.animate({ transform: 's.92,1t8' }, 700, mina.bounce);
        arrow_milestones_policies.animate({ transform: 's1,.9t5' }, 700, mina.bounce);
        arrow_ptjs_benfs_slo.animate({ transform: 's.8,1t-5,0' }, 700, mina.bounce);
    });

    function policies_level2Out() {

        outElem([ly_policies, ly_slo]);
        overVisibility([level1_policies_group, level3_policies_group, ly_policies]);

        level2_policies_group.animate({ transform: 's1,1t0,0' }, 700, mina.bounce);
        sphere_red_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        txt_level2_policies.animate({ opacity: '0' }, 700, mina.bounce);
        bg_policies_txts.attr({ opacity: '0' });
        bg_policies.attr({ style: 'fill-opacity:0.2' });

        chnStroke(arrow_slo, { stroke: '#000000', width: '2px', opacity: '1' });
        arrow_policies_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: #000000; stroke-width: 2px; opacity:1` }, mina.bounce);
        });

        arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
        arrow_milestones_policies.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_ptjs_benfs_slo.animate({ transform: 's1,1t0,0' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);

    }



    level3_policies_group.hover(function () {
        chnStroke([bg_level3_policies], { width: '3' });
        chnStroke(arrow_policies_level3_oicr, { width: '3' });
    }, function () {
        chnStroke([bg_level3_policies, arrow_policies_level3_oicr], { stroke: 'white', width: '1' })
        chnStroke(arrow_policies_level3_oicr, { width: '2' });
    })

    level3_policies_group.click(function () {

        overElem([ly_policies, ly_slo]);
        outVisibility([level1_policies_group, level2_policies_group, ly_policies]);

        level3_policies_group.animate({ transform: 's1.6,1.6t-114,0' }, 700, mina.bounce);
        sphere_red_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        txt_level3_policies.animate({ opacity: '1' }, 700, mina.bounce);
        bg_policies_txts.animate({ opacity: '1' }, 700, mina.bounce);
        bg_policies.attr({ style: 'fill-opacity:1' });

        arrow_policies_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });
        arrow_slo.selectAll("line").forEach(function (e, i) {
            e.attr({ style: `stroke: white; stroke-width: 3px; stroke-opacity:1` }, mina.bounce);
        });

        arrow_slo.animate({ transform: 't-2,7' }, 700, mina.bounce);
        arrow_policies_slo.animate({ transform: 's.92,1t8' }, 700, mina.bounce);
        arrow_milestones_policies.animate({ transform: 's1,.9t5' }, 700, mina.bounce);
        arrow_ptjs_benfs_slo.animate({ transform: 's.8,1t-5,0' }, 700, mina.bounce);
    });

    function policies_level3Out() {

        outElem([ly_policies, ly_slo]);
        overVisibility([level1_policies_group, level2_policies_group, ly_policies]);

        level3_policies_group.animate({ transform: 's1,1t0,0' }, 700, mina.bounce);
        sphere_red_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
        txt_level3_policies.animate({ opacity: '0' }, 700, mina.bounce);
        bg_policies_txts.attr({ opacity: '0' });
        bg_policies.attr({ style: 'fill-opacity:0.2' });

        chnStroke(arrow_slo, { stroke: '#000000', width: '2px', opacity: '1' });
        arrow_policies_slo.selectAll("path").forEach(function (e, i) {
            e.attr({ style: `stroke: #000000; stroke-width: 2px; opacity:1` }, mina.bounce);
        });

        arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
        arrow_milestones_policies.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_ptjs_benfs_slo.animate({ transform: 's1,1t0,0' }, 700, mina.bounce);
        arrow_innovations_stage4_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_oicr_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
        arrow_policies_level2_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);
        arrow_policies_level3_oicr.animate({ transform: 's1,1,t0,0' }, 700, mina.bounce);

    }




    function allCirclesClose() {
        stage1Out();
        stage2Out();
        stage3Out();
        stage4Out();

        oicr_level1Out();
        oicr_level2Out();
        oicr_level3Out();

        policies_level1Out();
        policies_level2Out();
        policies_level3Out();
    }



    function animateCircles(el, bg) {
        el.paper.append(el);
        bg.animate({ transform: 's1.6,1.6' }, 700, mina.bounce);
    };

    function unanimateCircles(bg) {
        bg.animate({ transform: 's1,1' }, 700, mina.bounce);
    }


    function outElem(arr) {
        if (arr && arr.length > 0) {
            arr.forEach(el => {
                el.animate({ transform: 's1,1' }, 700, mina.bounce);
            });
        }
    }

    function overElem(arr,) {
        arr.forEach(el => {
            el.animate({ transform: 's1.1,1.1' }, 700, mina.bounce);
        });
    }

    function outOpacity(arr) {
        if (arr && arr.length > 0) {
            arr.forEach(el => {
                el.animate({ opacity: '1' }, 700, mina.bounce);
                // el.animate({ style: 'display: block' }, 700, mina.bounce);
            });
        }
    }

    function overOpacity(arr) {
        arr.forEach(el => {
            // el.attr({ style: 'display: none' }, 700, mina.bounce);
            el.animate({ opacity: '0' }, 700, mina.bounce);
        });
    }

    function outVisibility(arr) {
        if (arr && arr.length > 0) {
            arr.forEach(el => {
                el.attr({ display: "none" });
                // el.attr({ visibility: "hidden" });
            });
        }
    }

    function overVisibility(arr) {
        arr.forEach(el => {
            el.attr({ display: "block" });
            // el.attr({ visibility: "visible" });
        });
    }

    function chnStroke(el, params) {
        if (el.length == undefined) {
            if (params.opacity)
                el.attr({ opacity: params.opacity });
            el.selectAll("line").forEach(function (e, i) {
                e.attr({ style: `stroke: ${params.stroke}; stroke-width:  ${params.width}` }, mina.bounce);
            });
            //  el.attr({ style: `stroke: ${params.stroke}; stroke-width:  ${params.width}` }, mina.bounce);
        } else {
            el.forEach(element => {
                element.attr({ style: `stroke: ${params.stroke}; stroke-width:  ${params.width}` }, mina.bounce);
            });
        }
    }



}