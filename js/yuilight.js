YAHOO.namespace('yuilight');
YAHOO.yuilight.main = {

	YE:			YAHOO.util.Event,
	Dom:		YAHOO.util.Dom,
	$:			YAHOO.util.Dom.get,
	node:		'',

	spotColor:	'#000',
	bgColor:	'#FFF',
	speed:		0.3,
	opacity:	0.4,

	init: function(){
		var yuilights = yl.Dom.getElementsByClassName('yuilight');
		var yuiLen = yuilights.length;
		for(var i=0;i<yuiLen;i++){
			if(yl.Dom.hasClass(yuilights[i], 'ylover')){
				yl.YE.on(yuilights[i], 'mouseover', yl.show_yuilight, yuilights[i]);
				yl.YE.on(yuilights[i], 'mouseout', yl.hide_yuilight, yuilights[i]);
			} else {
				yl.YE.on(yuilights[i], 'click', yl.show_yuilight, yuilights[i]);
			}
		}
	},

	show_yuilight: function(e, el){
		yl.spot = yl.$('yuilight');
		if(!yl.spot){
			var docWidth = yl.Dom.getDocumentWidth();
			var docHeight = yl.Dom.getDocumentHeight();

			yl.spot = document.createElement('div');
			document.body.appendChild(yl.spot);
			yl.spot.id = 'yuilight';
			yl.Dom.setStyle(yl.spot, 'position', 'absolute');
			yl.Dom.setStyle(yl.spot, 'top', '0');
			yl.Dom.setStyle(yl.spot, 'left', '0');
			yl.Dom.setStyle(yl.spot, 'width', docWidth+'px');
			yl.Dom.setStyle(yl.spot, 'height', docHeight+'px');
			yl.Dom.setStyle(yl.spot, 'backgroundColor', yl.spotColor);
			yl.Dom.setStyle(yl.spot, 'z-index', '9998');
			yl.Dom.setStyle(yl.spot, 'display', 'none');
			yl.Dom.setStyle(yl.spot, 'opacity', '0');

		}
		yl.YE.removeListener(yl.spot, 'click');
		yl.YE.on(yl.spot, 'click', yl.hide_yuilight, el);

		yl.Dom.setStyle(el, 'position', 'relative');
		yl.Dom.setStyle(el, 'z-index', '9999');
		yl.oldBg = yl.Dom.getStyle(el, 'background-color');
		if(yl.oldBg === '' || yl.oldBg === 'transparent' || yl.oldBg === 'rgba(0, 0, 0, 0)'){
			yl.Dom.setStyle(el, 'background-color', yl.bgColor);
			yl.remColor = true;
		}

		yl.Dom.setStyle(yl.spot, 'display', 'block');
		var newAnim = new YAHOO.util.Anim(yl.spot,
			{
				opacity: { to: yl.opacity }
			}, yl.speed
		);
		newAnim.animate();
	},

	hide_yuilight: function(e, el){
//		if(yl.YE.getTarget(e) === el){
			yl.Dom.setStyle(yl.spot, 'display', 'block');
			var newAnim = new YAHOO.util.Anim(yl.spot,
				{
					opacity: { to: 0 }
				}, yl.speed
			);
			newAnim.animate();
			newAnim.onComplete.subscribe(function(){
				yl.Dom.setStyle(yl.spot, 'display', 'none');
				yl.Dom.setStyle(el, 'z-index', '');
				yl.Dom.setStyle(el, 'position', '');
				if(yl.remColor === true){
					yl.Dom.setStyle(el, 'background-color', '');
					yl.remColor = false;
				}
			});
//		}
	}
}
yl = YAHOO.yuilight.main;
yl.YE.onDOMReady(yl.init);