
$.fn.extend({
	etoSlider: function(ayarlar) {
		var busl = this;
		var otomatik_sure = 5000;
		var animasyon_sure = 500;
		
		//BASLANGIC
		busl.addClass("eto-slider");
		var itemler = busl.find("ul li");
		busl.append('<div class="eto-slider_buyukresims"></div>');
		busl.append('<div class="eto-slider_resimliindizdis"><div class="eto-slider_resimliindizic"></div></div>');
		var bukonteynir = busl.find(".eto-slider_buyukresims");
		var buresimliindizdis = busl.find(".eto-slider_resimliindizdis");
		var buresimliindizic = buresimliindizdis.find(".eto-slider_resimliindizic"); 
		var sl_genislik = busl.width();
		var soldanbosluk = 0;
		for(var x=0;x<itemler.size();x++) {
			var cagirilanitem = itemler.eq(x);
			var itemresimtek = cagirilanitem.find("img");
			busl.find(".eto-slider_buyukresims").append('<div class="eto-sl-buyuktek" style="left: '+soldanbosluk+'px;"><img src="'+itemresimtek.attr('src')+'"></div>');
			buresimliindizic.append('<div class="eto-slider_indiztek"><img src="'+cagirilanitem.attr("data-indiresim")+'"></div>');
			if(x == 0) {
				bukonteynir.find(".eto-sl-buyuktek").eq(0).addClass("etoslaktif");
				buresimliindizic.find(".eto-slider_indiztek").eq(0).addClass("aktif");
			}
			soldanbosluk = soldanbosluk + sl_genislik;
		}
		//YUKSEKLIK ADAPTOR
		var sl_yukseklik = $(".eto-slider_buyukresims").find(".eto-sl-buyuktek").eq(0).height();
		busl.height(sl_yukseklik);
		bukonteynir.height(sl_yukseklik);
		setInterval(function(){
			sl_yukseklik = $(".eto-slider_buyukresims").find(".eto-sl-buyuktek").eq(0).height();
			busl.height(sl_yukseklik);
			bukonteynir.height(sl_yukseklik);
		},250);	
		
		//OK KONTOLLER
		busl.append('<div class="eto-sl_okkontrol eto-sl_solok"><img src="files/site/etosl_ok_isaret.png" class="etoslokicon"></div>');
		busl.append('<div class="eto-sl_okkontrol eto-sl_sagok"><img src="files/site/etosl_ok_isaret.png" class="etoslokicon"></div>');
		busl.append('<div class="eto-sl_okkont_grad eto-sl_grad_sol"></div>');
		busl.append('<div class="eto-sl_okkont_grad eto-sl_grad_sag"></div>'); 
		
		var indiz_gecis = true;
		busl.find(".eto-sl_okkontrol.eto-sl_solok").click(function(){
		  if(indiz_gecis) {
				indiz_gecis = false;	
			var mevcutIndex = bukonteynir.find(".eto-sl-buyuktek.etoslaktif").index();
			var itemlersayisi_offset = itemler.size() - 1;
			var sonrakiIndex = mevcutIndex - 1;
			if(sonrakiIndex<0) {
				sonrakiIndex = itemlersayisi_offset;
			}
			busl.etoSliderKonumaGit(sonrakiIndex,animasyon_sure);
			setTimeout(function(){
					indiz_gecis = true;
			},animasyon_sure);  
		  } 
		});
		
		busl.find(".eto-sl_okkontrol.eto-sl_sagok").click(function(){
		  if(indiz_gecis) {
				indiz_gecis = false;	
			var mevcutIndex = bukonteynir.find(".eto-sl-buyuktek.etoslaktif").index();
			var itemlersayisi_offset = itemler.size() - 1;
			var sonrakiIndex = mevcutIndex + 1;
			if(sonrakiIndex>itemlersayisi_offset) {
				sonrakiIndex = 0;
			}
			busl.etoSliderKonumaGit(sonrakiIndex,animasyon_sure);
			setTimeout(function(){
					indiz_gecis = true;
			},animasyon_sure);  
		  } 
		});
		
		
		setInterval(function(){
			if(indiz_gecis) {
				indiz_gecis = false;
				var aktifitem = bukonteynir.find(".eto-sl-buyuktek.etoslaktif").index();	
				var sonrakiItem = aktifitem+1;
				var itemsayisi = itemler.size();
				var itemofset = itemsayisi - 1;

				if(sonrakiItem>itemofset) {
					sonrakiItem = 0;
				} 
				busl.etoSliderKonumaGit(sonrakiItem,animasyon_sure);
				setTimeout(function(){
					indiz_gecis = true;
				},animasyon_sure);
			}	
		},otomatik_sure);
		
		buresimliindizic.find(".eto-slider_indiztek").click(function(){
			if(indiz_gecis) {
				indiz_gecis = false;
				busl.etoSliderKonumaGit($(this).index(),animasyon_sure);
				setTimeout(function(){
					indiz_gecis = true;
				},animasyon_sure);
			}	
		});
	},
	etoSliderKonumaGit: function(indiz,animasyon_sure){
		var busl = this;
		
		var bukonteynir = busl.find(".eto-slider_buyukresims");
		var buresimliindizdis = busl.find(".eto-slider_resimliindizdis");
		var buresimliindizic = buresimliindizdis.find(".eto-slider_resimliindizic"); 
		var buresimliindiz_itemleri = buresimliindizic.find(".eto-slider_indiztek");
		var buitems = bukonteynir.find(".eto-sl-buyuktek");
		var sl_genislik = busl.width();
		var gidilecekdeger = indiz;
		if(gidilecekdeger>buitems.size()) {
			gidilecekdeger = 0;
		}
		buitems.removeClass("etoslaktif");
		buitems.eq(gidilecekdeger).addClass("etoslaktif");
		buresimliindiz_itemleri.removeClass("aktif");
		buresimliindiz_itemleri.eq(gidilecekdeger).addClass("aktif");
	 
		for(var x=0;x<buitems.size();x++) {
			var olmasigereken_sol = sl_genislik * x;
			var gidilecek_sol = olmasigereken_sol - (sl_genislik * gidilecekdeger); 
			buitems.eq(x).animate({"left":gidilecek_sol+"px"},animasyon_sure);
		}
	}
});