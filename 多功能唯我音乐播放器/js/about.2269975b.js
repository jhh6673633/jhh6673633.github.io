(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"0d0c":function(t,i,s){"use strict";var a=s("3407"),e=s.n(a);e.a},2059:function(t,i,s){"use strict";s.r(i);var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"playlist"},[s("div",{staticClass:"go-back",on:{click:function(i){return t.$router.go(-1)}}},[s("i",{staticClass:"fa fa-chevron-left back",attrs:{"aria-hidden":"true"}})]),t.playlist?s("PlaylistIroduce",{attrs:{item:t.playlist}}):t._e(),t.playlist?s("PlaylistDescribe",{attrs:{item:t.playlist}}):t._e(),s("hr"),s("ul",{staticClass:"songlist"},[t.playlist?t._l(t.playlist.tracks,(function(i,a){return s("SongListItem",{key:a,attrs:{"song-item":i,index:a,"is-show-quality":!1,"is-show-ranking":!1,xxx:t.playlist.tracks},on:{"translate-currentid":function(i){return t.$emit("translate-currentid",i)}}})})):t._e()],2)],1)},e=[],n=s("16a2"),l=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("section",{staticClass:"introduce"},[s("div",{staticClass:"mask",style:{backgroundImage:"url("+t.item.coverImgUrl+")"}}),s("div",{staticClass:"introduce-img"},[s("img",{attrs:{src:t.item.coverImgUrl,alt:""}})]),s("div",{staticClass:"test"},[s("h2",[t._v(t._s(t.item.name))]),s("div",{staticClass:"autor"},[s("img",{attrs:{src:t.item.creator.avatarUrl,alt:""}}),t._v(" "+t._s(t.item.creator.nickname)+" ")])])])},c=[],r={props:["item"]},o=r,u=(s("f3cb"),s("2877")),d=Object(u["a"])(o,l,c,!1,null,null,null),f=d.exports,m=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"sort"},[s("div",{staticClass:"tag"},[t._v(" 标签： "),t._l(t.item.tags,(function(i,a){return s("em",{key:a},[t._v(t._s(i))])}))],2),s("div",{staticClass:"brief",class:{hide:t.isHide}},[t._v(" 简介： "),s("span",[t._v(t._s(t.item.description))]),t.isHide?s("i",{staticClass:"down",on:{click:function(i){t.isHide=!t.isHide}}}):s("i",{staticClass:"up",on:{click:function(i){t.isHide=!t.isHide}}})])])},p=[],v={props:["item"],data:function(){return{isHide:!0}}},y=v,_=(s("0d0c"),Object(u["a"])(y,m,p,!1,null,"2b7da3d0",null)),g=_.exports,b={data:function(){return{playlist:null}},components:{SongListItem:n["a"],PlaylistIroduce:f,PlaylistDescribe:g},methods:{getPlayListDetail:function(t){var i=this;this.axios.get("http://music.kele8.cn/playlist/detail",{params:{id:t}}).then((function(t){i.playlist=t.data.playlist}))}},created:function(){console.log("创建")},beforeRouteEnter:function(t,i,s){s((function(i){i.getPlayListDetail(t.query.id)}))}},h=b,k=Object(u["a"])(h,a,e,!1,null,null,null);i["default"]=k.exports},3407:function(t,i,s){},4047:function(t,i,s){},f3cb:function(t,i,s){"use strict";var a=s("4047"),e=s.n(a);e.a}}]);
//# sourceMappingURL=about.2269975b.js.map