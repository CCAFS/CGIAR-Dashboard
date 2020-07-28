window.onload = function () {
    console.log('Snap')
    var snp = Snap('#svg-interactive');

    // <script xlink:href="js/snap.svg-min.js" />
    // <script xlink:href="js/main.js" />

    //     /**** spheres *****/

    //     var sphere_red_bg = snp.select('#sphere_red_bg');
        var sphere_yellow_bg = snp.select('#sphere_yellow_bg');
    var sphere_white_bg = snp.select('#sphere_white_bg');

    var trainees_group = snp.select('#ly_ppl_trained');
    trainees_group.attr({ style: 'cursor: default' });

    //     var publications_group = snp.select('#ly_publications');
    //     publications_group.attr({ style: 'cursor: default' });

    //     var almetrics_bg = snp.select('#ly_almetric');

    //     var milestones_group = snp.select('#ly_milestones');
    //     milestones_group.attr({ style: 'cursor: default' });

    //     var ly_policies = snp.select('#ly_policies');
    //     var ly_innovations = snp.select('#ly_innovations');
    //     var ly_slo = snp.select('#ly_slo');
    //     var ly_oicr = snp.select('#ly_oicr');
    //     var ly_pjts_benfs = snp.select('#ly_pjts_benfs');


    //     var bg_level1_policies = snp.select('#bg_level1_policies');
    //     var tl_level1_policies = snp.select('#tl_level1_policies');
    //     var policies_lvl1_group = snp.group(bg_level1_policies, tl_level1_policies);
    //     policies_lvl1_group.attr({ style: 'cursor: default' });

    //     var policies_level1_text_g = snp.select('#policies_level1_text_g');


    //     var bg_level2_policies = snp.select('#bg_level2_policies');
    //     var tl_level2_policies = snp.select('#tl_level2_policies');
    //     var policies_lvl2_group = snp.group(bg_level2_policies, tl_level2_policies);
    //     policies_lvl2_group.attr({ style: 'cursor: default' });

    //     var policies_level2_text_g = snp.select('#policies_level2_text_g');



    //     var bg_level3_policies = snp.select('#bg_level3_policies');
    //     var tl_level3_policies = snp.select('#tl_level3_policies');
    //     var policies_lvl3_group = snp.group(bg_level3_policies, tl_level3_policies);
    //     policies_lvl3_group.attr({ style: 'cursor: default' });

    //     var policies_level3_text_g = snp.select('#policies_level3_text_g');

    //     var bg_oicr = snp.select('#bg_oicr');


    //     var bg_level1_oicr = snp.select('#bg_level1_oicr');
    //     var tl_level1_oicr = snp.select('#tl_level1_oicr');
    //     var oicr_lvl1_group = snp.group(bg_level1_oicr, tl_level1_oicr);
    //     oicr_lvl1_group.attr({ style: 'cursor: default' });

    //     // var oicr_text_bg = snp.select('#oicr_text_bg');
    //     // var oicr_txt1_ln = snp.select('#oicr_txt1_ln');
    //     var oicr_level1_text_g = snp.select('#oicr_level1_text_g');

    //     var bg_level2_oicr = snp.select('#bg_level2_oicr');
    //     var tl_level2_oicr = snp.select('#tl_level2_oicr');
    //     var oicr_lvl2_group = snp.group(bg_level2_oicr, tl_level2_oicr);
    //     oicr_lvl2_group.attr({ style: 'cursor: default' });

    //     // var oicr_text_bg = snp.select('#oicr_text_bg');
    //     // var oicr_txt1_ln = snp.select('#oicr_txt1_ln');  
    //     var oicr_level2_text_g = snp.select('#oicr_level2_text_g');

    //     var bg_level3_oicr = snp.select('#bg_level3_oicr');
    //     var tl_level3_oicr = snp.select('#tl_level3_oicr');
    //     var oicr_lvl3_group = snp.group(bg_level3_oicr, tl_level3_oicr);
    //     oicr_lvl3_group.attr({ style: 'cursor: default' });

    //     // var oicr_text_bg = snp.select('#oicr_text_bg');
    //     // var oicr_txt1_ln = snp.select('#oicr_txt1_ln');  
    //     var oicr_level3_text_g = snp.select('#oicr_level3_text_g');


    //     /***
    //      * Innovations
    //      */

    //     var container_innovations = snp.select('#container_innovations');
    //     var innovations_tl = snp.select('#innovations_tl');

    //     var bg_stage1_innovations = snp.select('#bg_stage1_innovations');
    //     var tl_stage1_innovations = snp.select('#tl_stage1_innovations');
    //     var stage1_innovations_group = snp.group(bg_stage1_innovations, tl_stage1_innovations);
    //     stage1_innovations_group.attr({ style: 'cursor: default' });


    //     var txt_stage1_innovations = snp.select('#txt_stage1_innovations');


    //     var bg_stage2_innovations = snp.select('#bg_stage2_innovations');
    //     var tl_stage2_innovations = snp.select('#tl_stage2_innovations');
    //     var stage2_innovations_group = snp.group(bg_stage2_innovations, tl_stage2_innovations);
    //     stage2_innovations_group.attr({ style: 'cursor: default' });

    //     var txt_stage2_innovations = snp.select('#txt_stage2_innovations');


    //     var bg_stage3_innovations = snp.select('#bg_stage3_innovations');
    //     var tl_stage3_innovations = snp.select('#tl_stage3_innovations');
    //     var stage3_innovations_group = snp.group(bg_stage3_innovations, tl_stage3_innovations);
    //     stage3_innovations_group.attr({ style: 'cursor: default' });

    //     var txt_stage3_innovations = snp.select('#txt_stage3_innovations');

    //     var bg_stage4_innovations = snp.select('#bg_stage4_innovations');
    //     var tl_stage4_innovations = snp.select('#tl_stage4_innovations');
    //     var stage4_innovations_group = snp.group(bg_stage4_innovations, tl_stage4_innovations);
    //     stage4_innovations_group.attr({ style: 'cursor: default' });

    //     var txt_stage4_innovations = snp.select('#txt_stage4_innovations');





    //     /**
    //     * arrows 
    //     */
    //     // var arrow_head_oicr_slo = snp.select('#arrow_head_oicr_slo');
    //     // var arrow_pjs_ben_slo = snp.select('#arrow_pjs_ben_slo');
    //     // var arrow_head_pjs_ben_slo = snp.select('#arrow_head_pjs_ben_slo');

    //     // var arrow_head_policies2_oicr = snp.select('#arrow_head_policies2_oicr');
    //     // var arrow_policies3_oicr = snp.select('#arrow_policies3_oicr');
    //     // var arrow_head_policies3_oicr = snp.select('#arrow_head_policies3_oicr');


    //     // var arrow_milestones = snp.select('#LR_Edit_lines');
    //     // var arrow_milestones_1 = snp.select('#LR_Edit_lines_1');
    //     // // var arrow_milestones_group = snp.group(arrow_milestones, arrow_milestones_1)
    //     // var arrow_innovations_pjs = snp.select('#arrow_innovations_pjs');
    //     // var arrow_head_innovations_pjs = snp.select('#arrow_head_innovations_pjs');
    //     // var arrow_innovations_lvl4_oicr = snp.select('#arrow_innovations_lvl4_oicr');
    //     // var arrow_head_innovations_lvl4_oicr = snp.select('#arrow_head_innovations_lvl4_oicr');
    //     // var arrow_head_milestones_policies = snp.select('#arrow_head_milestones_policies');
    //     // var arrow_head_almetrics = snp.select('#arrow_head_almetrics');
    //     // var arrow_body_almetrics = snp.select('#arrow_body_almetrics');

    //     // var arrow_body_milestones_policies = snp.select('#arrow_body_milestones_policies');
    //     // var arrow_head_milestones_policies = snp.select('#arrow_head_milestones_policies');
    //     // var arrow_body_milestones_innovations = snp.select('#arrow_body_milestones_innovations');
    //     // var arrow_head_milestones_innovations = snp.select('#arrow_head_milestones_innovations');

    //     // var arrow_line_policies_slo = snp.select('#arrow_line_policies_slo');
    //     // var arrow_curve_policies_slo = snp.select('#arrow_curve_policies_slo');


    //     var arrow_innovations_ptjs_benfs = snp.select('#arrow_innovations_ptjs_benfs');
    //     var arrow_ptjs_benfs_slo = snp.select('#arrow_ptjs_benfs_slo');
    //     var arrow_publications_almetrics = snp.select('#arrow_publications_almetrics');
    //     var arrow_milestones_policies = snp.select('#arrow_milestones_policies');
    //     var arrow_milestones_innovations = snp.select('#arrow_milestones_innovations');
    //     var arrow_policies_slo = snp.select('#arrow_policies_slo');
    //     var arrow_oicr_slo = snp.select('#arrow_oicr_slo');
    //     var arrow_slo = snp.select('#arrow_slo');
    //     var arrow_innovations_oicr = snp.select('#arrow_innovations_oicr');


    //     var arrow_policies2_oicr = snp.select('#arrow_policies2_oicr');
    //     var arrow_policies3_oicr = snp.select('#arrow_policies3_oicr');

    //     /***
    //     * 
    //     * PhD trainees
    //     */

    trainees_group.hover(function () {
        overElem([this]);
        sphere_white_bg.animate({ transform: 's1.1,1' }, 700, mina.bounce);
        
    }, function () {
        outElem([this]);
        sphere_white_bg.animate({ transform: 's1,1' }, 700, mina.bounce);
    });

    //     /**
    //     * 
    //     * Publicaitions
    //     * 
    //     */

    //     publications_group.hover(function () {
    //         overElem([this, sphere_white_bg, almetrics_bg]);
    //         chnStroke(arrow_publications_almetrics, { width: '3px' });
    //         arrow_publications_almetrics.animate({ transform: 's.5,.9' }, 700, mina.bounce);
    //     }, function () {
    //         outElem([this, sphere_white_bg, almetrics_bg]);
    //         chnStroke(arrow_publications_almetrics, { width: '1px' });
    //         arrow_publications_almetrics.animate({ transform: 's1,1' }, 700, mina.bounce);
    //     });

    //     /**
    //     * 
    //     * Almetrics
    //     * 
    //     */


    //     almetrics_bg.hover(function () {
    //         overElem([this, sphere_yellow_bg]);
    //         arrow_publications_almetrics.animate({ transform: 's.1,.95' }, 700, mina.bounce);
    //     }, function () {
    //         outElem([this, sphere_yellow_bg]);
    //         arrow_publications_almetrics.animate({ transform: 's1,1' }, 700, mina.bounce);
    //     });

    //     /**
    //     * 
    //     * Milestones
    //     * 
    //     */

    //     milestones_group.hover(function () {
    //         overElem([this, sphere_white_bg, sphere_yellow_bg, ly_policies, ly_innovations]);
    //         arrow_milestones_policies.animate({ transform: 's1,.7' }, 700, mina.bounce);
    //         arrow_milestones_innovations.animate({ transform: 's1,.7' }, 700, mina.bounce);

    //     }, function () {
    //         outElem([this, sphere_white_bg, sphere_yellow_bg, ly_policies, ly_innovations]);
    //         arrow_milestones_policies.animate({ transform: 's1,1' }, 700, mina.bounce);
    //         arrow_milestones_innovations.animate({ transform: 's1,1' }, 700, mina.bounce);
    //     });

    //     /**
    //     **
    //     * Policies
    //     **
    //     **/
    //     policies_lvl1_group.hover(function () {
    //         overElem([ly_slo, sphere_yellow_bg]);
    //         animateCircles(this, this);
    //         this.paper.append(policies_level1_text_g);
    //         policies_level1_text_g.animate({ opacity: '1' }, 700, mina.easeinout);
    //         chnStroke([arrow_policies_slo, arrow_slo], { stroke: 'white', width: '3px' });
    //         arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    //     }, function () {
    //         outElem([ly_slo, sphere_yellow_bg]);
    //         unanimateCircles(this)
    //         this.paper.prepend(policies_level1_text_g)
    //         policies_level1_text_g.animate({ opacity: '0' }, 700, mina.easeinout);
    //         chnStroke([arrow_policies_slo, arrow_slo], { stroke: '#353535' })
    //         arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
    //     });


    //     policies_lvl2_group.hover(function () {
    //         overElem([ly_slo, sphere_red_bg, ly_oicr]);
    //         animateCircles(this, this);
    //         this.paper.append(policies_level2_text_g);
    //         policies_level2_text_g.animate({ opacity: '1' }, 700, mina.easeinout);
    //         chnStroke([arrow_policies_slo, arrow_slo, arrow_policies2_oicr], { stroke: 'white', width: '3px' });
    //         arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    //         arrow_policies2_oicr.animate({ transform: 's1,.8' }, 700, mina.bounce);
    //         arrow_policies3_oicr.animate({ transform: 's1,.8' }, 700, mina.bounce);
    //     }, function () {
    //         outElem([ly_slo, sphere_red_bg, ly_oicr]);
    //         unanimateCircles(this);
    //         this.paper.prepend(policies_level2_text_g);
    //         policies_level2_text_g.animate({ opacity: '0' }, 700, mina.easeinout);
    //         chnStroke([arrow_policies_slo, arrow_slo], { stroke: '#353535' });
    //         chnStroke([arrow_policies2_oicr], { width: '1px' });
    //         arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
    //         arrow_policies2_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
    //         arrow_policies3_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
    //     });



    //     policies_lvl3_group.hover(function () {
    //         overElem([ly_slo, sphere_red_bg, ly_oicr]);
    //         animateCircles(this, this);
    //         this.paper.append(policies_level3_text_g);
    //         policies_level3_text_g.animate({ opacity: '1' }, 700, mina.easeinout);
    //         chnStroke([arrow_policies_slo, arrow_slo, arrow_policies3_oicr], { stroke: 'white', width: '3px' });
    //         arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    //         arrow_policies2_oicr.animate({ transform: 's1,.8' }, 700, mina.bounce);
    //         arrow_policies3_oicr.animate({ transform: 's1,.8' }, 700, mina.bounce);
    //     }, function () {
    //         outElem([ly_slo, sphere_red_bg, ly_oicr]);
    //         unanimateCircles(this);
    //         this.paper.prepend(policies_level3_text_g);
    //         policies_level3_text_g.animate({ opacity: '0' }, 700, mina.easeinout);
    //         chnStroke([arrow_policies_slo, arrow_slo,], { stroke: '#353535' });
    //         chnStroke([arrow_policies3_oicr], { width: '1px' });
    //         arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
    //         arrow_policies2_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
    //         arrow_policies3_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
    //     });

    //     /**
    //      * OICR
    //      **/

    //     oicr_lvl1_group.hover(function () {
    //         animateCircles(this, this);
    //         overElem([ly_slo, sphere_yellow_bg]);
    //         chnStroke([arrow_oicr_slo, arrow_slo], { stroke: 'white', width: '3px' })
    //         this.paper.append(oicr_level1_text_g, arrow_oicr_slo);
    //         arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    //         arrow_policies_slo.animate({ transform: 't0,9' }, 700, mina.bounce);

    //         arrow_policies2_oicr.animate({ opacity: '0' }, 700, mina.bounce);
    //         oicr_level1_text_g.animate({ opacity: '1' }, 700, mina.bounce);


    //     }, function () {
    //         unanimateCircles(this);
    //         outElem([ly_slo, sphere_yellow_bg]);
    //         chnStroke([arrow_oicr_slo, arrow_slo], { stroke: '#353535', width: '1px' })
    //         this.paper.prepend(oicr_level1_text_g);
    //         arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
    //         arrow_policies_slo.animate({ transform: 't0,0' }, 700, mina.bounce);

    //         arrow_policies2_oicr.animate({ opacity: '1' }, 700, mina.bounce);
    //         oicr_level1_text_g.animate({ opacity: '0', transform: 's1,1' }, 700, mina.bounce);
    //     });

    //     oicr_lvl2_group.hover(function () {
    //         animateCircles(this, this);
    //         overElem([ly_slo, sphere_yellow_bg]);
    //         chnStroke([arrow_oicr_slo, arrow_slo], { stroke: 'white', width: '3px' });
    //         this.paper.append(oicr_level2_text_g);
    //         arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    //         arrow_policies_slo.animate({ transform: 't0,9' }, 700, mina.bounce);

    //         arrow_policies2_oicr.animate({ opacity: '0' }, 700, mina.bounce);
    //         arrow_policies3_oicr.animate({ opacity: '0' }, 700, mina.bounce);
    //         oicr_level2_text_g.animate({ opacity: '1' }, 700, mina.bounce);
    //     }, function () {
    //         unanimateCircles(this);
    //         outElem([ly_slo, sphere_yellow_bg]);
    //         chnStroke([arrow_oicr_slo, arrow_slo], { stroke: '#353535', width: '1px' })
    //         this.paper.prepend(oicr_level2_text_g);
    //         arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
    //         arrow_policies_slo.animate({ transform: 't0,0' }, 700, mina.bounce);

    //         arrow_policies2_oicr.animate({ opacity: '1' }, 700, mina.bounce);
    //         arrow_policies3_oicr.animate({ opacity: '1' }, 700, mina.bounce);
    //         oicr_level2_text_g.animate({ opacity: '0', transform: 's1,1' }, 700, mina.bounce);
    //     });

    //     oicr_lvl3_group.hover(function () {
    //         animateCircles(this, this);
    //         overElem([ly_slo, sphere_yellow_bg]);
    //         chnStroke([arrow_oicr_slo, arrow_slo], { stroke: 'white', width: '3px' });
    //         this.paper.append(oicr_level3_text_g);
    //         arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    //         arrow_policies_slo.animate({ transform: 't0,9' }, 700, mina.bounce);

    //         oicr_level3_text_g.animate({ opacity: '1' }, 700, mina.bounce);
    //     }, function () {
    //         unanimateCircles(this);
    //         outElem([ly_slo, sphere_yellow_bg]);
    //         chnStroke([arrow_oicr_slo, arrow_slo], { stroke: '#353535', width: '1px' });
    //         this.paper.prepend(oicr_level3_text_g);
    //         arrow_slo.animate({ transform: 't0,0' }, 700, mina.bounce);
    //         arrow_policies_slo.animate({ transform: 't0,0' }, 700, mina.bounce);

    //         oicr_level3_text_g.animate({ opacity: '0', transform: 's1,1' }, 700, mina.bounce);
    //     });



    //     /**
    //     * 
    //     * Innovations
    //     * 
    //     */


    //     stage1_innovations_group.hover(function () {
    //         overElem([sphere_white_bg, container_innovations]);
    //         animateCircles(this, this);
    //         overOpacity([stage2_innovations_group, stage3_innovations_group, stage4_innovations_group, innovations_tl]);
    //         outOpacity([txt_stage1_innovations]);
    //         container_innovations.attr({ style: 'fill-opacity:1' });
    //     }, function () {
    //         outElem([sphere_white_bg, container_innovations]);
    //         outOpacity([stage2_innovations_group, stage3_innovations_group, stage4_innovations_group, innovations_tl])
    //         overOpacity([txt_stage1_innovations]);
    //         unanimateCircles(this);
    //         container_innovations.attr({ style: 'fill-opacity:0.2' });
    //     });

    //     stage2_innovations_group.hover(function () {
    //         overElem([sphere_white_bg, container_innovations]);
    //         animateCircles(this, this);
    //         overOpacity([stage1_innovations_group, stage3_innovations_group, stage4_innovations_group, innovations_tl]);
    //         outOpacity([txt_stage2_innovations]);
    //         container_innovations.attr({ style: 'fill-opacity:1' });
    //     }, function () {
    //         outElem([sphere_white_bg, container_innovations]);
    //         outOpacity([stage1_innovations_group, stage3_innovations_group, stage4_innovations_group, innovations_tl])
    //         overOpacity([txt_stage2_innovations]);
    //         unanimateCircles(this);
    //         container_innovations.attr({ style: 'fill-opacity:0.2' });
    //     });

    //     stage3_innovations_group.hover(function () {
    //         overElem([sphere_yellow_bg, container_innovations]);
    //         animateCircles(this, this);
    //         overOpacity([stage1_innovations_group, stage2_innovations_group, stage4_innovations_group, innovations_tl]);
    //         outOpacity([txt_stage3_innovations]);
    //         container_innovations.attr({ style: 'fill-opacity:1' });


    //         chnStroke([bg_stage3_innovations], { stroke: '#F79421' });

    //     }, function () {
    //         outElem([sphere_yellow_bg, container_innovations]);
    //         outOpacity([stage1_innovations_group, stage2_innovations_group, stage4_innovations_group, innovations_tl])
    //         overOpacity([txt_stage3_innovations]);
    //         unanimateCircles(this);
    //         container_innovations.attr({ style: 'fill-opacity:0.2' });
    //         chnStroke([bg_stage3_innovations], { stroke: 'white' });
    //     });

    //     stage4_innovations_group.hover(function () {
    //         overElem([sphere_yellow_bg, container_innovations, bg_oicr, ly_pjts_benfs]);
    //         animateCircles(this, this);
    //         overOpacity([stage1_innovations_group, stage2_innovations_group, stage3_innovations_group, innovations_tl]);
    //         outOpacity([txt_stage4_innovations]);
    //         container_innovations.attr({ style: 'fill-opacity:1' });

    //         chnStroke([arrow_innovations_ptjs_benfs, arrow_innovations_oicr], { width: '3px' });
    //         chnStroke([bg_stage4_innovations], { stroke: '#F79421' });

    //         // arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    //         arrow_innovations_ptjs_benfs.animate({ transform: 's1,.8' }, 700, mina.bounce);
    //         arrow_innovations_oicr.animate({ transform: 's1,.8' }, 700, mina.bounce);
    //         arrow_policies2_oicr.animate({ transform: 's1,.8' }, 700, mina.bounce);
    //         arrow_policies3_oicr.animate({ transform: 's1,.8' }, 700, mina.bounce);


    //     }, function () {
    //         outElem([sphere_yellow_bg, container_innovations, bg_oicr, ly_pjts_benfs]);
    //         outOpacity([stage1_innovations_group, stage2_innovations_group, stage3_innovations_group, innovations_tl])
    //         overOpacity([txt_stage4_innovations]);
    //         unanimateCircles(this);
    //         container_innovations.attr({ style: 'fill-opacity:0.2' });

    //         chnStroke([arrow_innovations_ptjs_benfs, arrow_innovations_oicr], { width: '1px' });
    //         chnStroke([bg_stage4_innovations], { stroke: 'white' });

    //         // arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    //         arrow_innovations_ptjs_benfs.animate({ transform: 's1,1' }, 700, mina.bounce);
    //         arrow_innovations_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
    //         arrow_policies2_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
    //         arrow_policies3_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
    //     });

    //     /****
    //      * Project benefits
    //      */

    //     ly_pjts_benfs.hover(function () {
    //         overElem([sphere_yellow_bg, sphere_red_bg, this, ly_slo]);
    //         // overElem([sphere_white_bg, container_innovations, bg_oicr]);
    //         // overOpacity([stage1_innovations_group, stage2_innovations_group, stage3_innovations_group, innovations_tl]);
    //         // outOpacity([txt_stage4_innovations]);
    //         // container_innovations.attr({ style: 'fill-opacity:1' });

    //         chnStroke([arrow_ptjs_benfs_slo], { stroke: 'white', width: '3px' });

    //         // // arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    //         arrow_ptjs_benfs_slo.animate({ transform: 's.5,1' }, 700, mina.bounce);
    //         // arrow_innovations_oicr.animate({ transform: 's1,.8' }, 700, mina.bounce);
    //         // arrow_policies2_oicr.animate({ transform: 's1,.8' }, 700, mina.bounce);
    //         // arrow_policies3_oicr.animate({ transform: 's1,.8' }, 700, mina.bounce);


    //     }, function () {
    //         outElem([sphere_yellow_bg, sphere_red_bg, this, ly_slo]);
    //         // outElem([sphere_white_bg, container_innovations, bg_oicr]);
    //         // outOpacity([stage1_innovations_group, stage2_innovations_group, stage3_innovations_group, innovations_tl])
    //         // overOpacity([txt_stage4_innovations]);
    //         // container_innovations.attr({ style: 'fill-opacity:0.2' });

    //         chnStroke([arrow_ptjs_benfs_slo], { stroke: '#353635', width: '1px' });

    //         // // arrow_slo.animate({ transform: 't0,7' }, 700, mina.bounce);
    //         arrow_ptjs_benfs_slo.animate({ transform: 's1,1' }, 700, mina.bounce);
    //         // arrow_innovations_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
    //         // arrow_policies2_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
    //         // arrow_policies3_oicr.animate({ transform: 's1,1' }, 700, mina.bounce);
    //     });













    function animateCircles(el, bg) {
        el.paper.append(el);
        bg.animate({ transform: 's2,2' }, 700, mina.bounce);
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
            });
        }
    }

    function overOpacity(arr) {
        arr.forEach(el => {
            el.animate({ opacity: '0' }, 700, mina.bounce);
        });
    }

    function chnStroke(el, params) {
        if (el.length == undefined) {
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