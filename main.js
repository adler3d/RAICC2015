// ==UserScript==
// @name        RAICC
// @namespace   qapjs
// @description add top id to nick
// @version     v1 (2016.06.05)
// @grant       none
// @include     http://russianaicup.ru/*
// @autor       Adler
// ==/UserScript==

var trs=document.getElementsByClassName("gamesTable")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
var out=Array.from(trs).map(f);
function tag(e,s){return Array.from(e.getElementsByTagName(s));}
function f(e){
  var map=0;tag(e,"img").forEach(elem=>{var tmp=elem.title.split(" ");if(tmp[0]=="Карта")map=tmp[1];});
  var arr=[];
  tag(e,"span").forEach(u=>{if(u.className!="day")arr.push(u.innerHTML);});
  var stolbik=[];
  if(0)tag(e,"td").forEach((td,i)=>{
    if(6==i)stolbik.push(tag(td,"div").map(
      div=>div.innerHTML
    ));
    //i==6; баллы
    //i==7; место
    //i==9; столбик "Смотреть игру"
  });
  return [map,arr,stolbik];
}
function head(m){
  document.getElementById("ratingGraph").innerHTML="<pre><textarea style='width:99%' rows=15>"+JSON.stringify(m)+"</textarea></pre>";
}

var loc=document.location+"";

if(loc.split("http://russianaicup.ru/profile/").length==2)
{
  var user=loc.split("http://russianaicup.ru/profile/")[1].split("/")[0];
  var g_pages=window.localStorage.getItem("pages");
  var loc=document.location;
  var m={};
  for(var i=0;i<out.length;i++){
    var ex=out[i];
    var inc=ex[1].map(nick=>(user==nick?1:0));
    if(!(ex[0] in m))m[ex[0]]=[0,0,0,0];
    var rec=m[ex[0]];
    inc.forEach((e,i)=>rec[i]+=inc[i]);
  }
  var pages=JSON.parse(g_pages?g_pages:"{}");
  pages[loc]=m;
  g_pages=JSON.stringify(pages);
  window.localStorage.setItem("pages",g_pages);
  head(pages);
}

if(0)
{
  var url2user=url=>url.split("http://russianaicup.ru/profile/")[1].split("/")[0];;
  var loc=document.location+"";
  var user=url2user(loc);
  var g_pages=window.localStorage.getItem("pages");
  var pages=JSON.parse(g_pages?g_pages:"{}");
  function to_ratingGraph(m){
    document.getElementById("ratingGraph").innerHTML="<pre><textarea style='width:99%' rows=15>"+m+"</textarea></pre>";
  }
  //
  var cons=[{},{},{},{},{}];var c2id=s=>{var con=s.split("contest");if(con.length==1)return 0;return 0|con[1].split("/")[0];};
  for(url in pages){
    var maps=pages[url];url+=url.indexOf("page")<0?"/page/1":"";
    var nick=url2user(url+"/");
    if(nick!=user)continue;
    var c=c2id(url);
    if(!(c in cons))cons[c]={};
    var cur=cons[c];
    for(mn in maps){
      if(!(mn in cur))cur[mn]=[0,0,0,0];
      var rec=cur[mn];
      maps[mn].forEach((e,i)=>rec[i]+=e);
    }
  }
  var cur=cons[c2id(loc)];
  var keys=Object.keys(cur);
  keys.sort();
  var cur2=[];keys.forEach(mn=>cur2[mn]=cur[mn]);cur=cur2;
  var out=[];
  for(mn in cur){
    out.push('[img="http://russianaicup.ru/s/1455027419026/assets/application/img/field/logo-'+mn+'.map.png"]     '+mn+' = '+JSON.stringify(cur[mn]));
  }
  to_ratingGraph(out.join("\n"));
}

var r1="FDoKE,SKolotienko,DVS,ud1,tyamgin,Antmsu,Spumote,Romka,Mr.Smile,tvv766,Karkun,Leos,Firen95,santa324,Tehnar,reat,mixei4,Oxidize,OrickBy,Lev,alex_sh,Eleonora,azt-yur,MagAlex,jetblack,alberist,kirimedia,cha0ss,makarovks,zoldatoff,pr1k0l,serlis,Adler,Valdemar,AntonT,BeamOfLight,novich-OK,ruspartisan,lama,capizza,kudinov.mikhail,err502,MakArt,GreenTea,strobetm,vladster,andregc,Evgenykz,alkozel,Ixanezis,planB,ipris,bratva,Igorjan94,martem1995,white2302,longloaf,MrPingvi,Bolduin,4way,Alick,and0,wertrix,gepard21,RigFox,Stef,alladdin,Redstar,tairesh,advokat,komendart,PROGER,temak,zloy.,stem,oreshnik,bear,eigenein,SemikX,ferc,Volandpro,Sirius,Croohand,turbotankist,Eran,GeneralHaos,topspin,GeoGraf,Omelianenko,rekcahd,AlexeyN,ALEXks,Olegnv,Hohol,Poma,i-tikhonov,Wierus,FlaBla,anzu,perevodchik228,Wisp93,Skyfire,chis,ilya_,morozec,olsh,latikov,DeeCo,dbf,alevlaber,a.bazhin,narutofan,DistinGa,iakolzin,mustang,Aegro,gohard,FirstStorm,AdmiralShadow,Eugene713,jimor,dimir,GreenHorsy,miniJoker,danmerey,NanoBones,nmakarov,StarCuriosity,Olaf,Laer,SLavaLL,sildc,altais,cadavrorum,cheeser,znak4,aplayt,sslotin,griboedov,norpadon,mi5,P_YegreS_P,udwarf,SDil,Anisimov,Levatol,psinetron,Big_Z,Astw,aBv,ReMaker,Headhunter,Serik,Alkev,fair_enough,IlyaSM,271828182845904,wide.wrd,Alexander_USU,zomac,Yura_Sultonov,kirdark,ManGeorge,kvld,Impuls,Vadimyan,bpa,PolyProgrammist,nikolaev,Vaden,Sominus,popolit,dobord,Zimbabwe23,1337,JlaHceJloT,zinya,Mr_Alone,Sneer,BurningNegr,YaguarVL,ludkich,Spartan,MaxPylypovych,Kannagi,YukkaSarasti,Rety,fitialovks,cahq,jacka7,turbodestroyer,vvv1559,fu-tyan,Psirex,Foxager,clamoris,ProGGG,Execrable,AndreySiunov,tws,Ancient_mage,vladimir,Fame,anon410,qaa12,Rempler,vedas,akacoder,BudAlNik,FOGY,RegressCheck,evarand,tjden,byserge,AlexBoyko,Zanoza,KostinOleg,RKB,alex700,snw1,Jatana,Rensa,Woogy,__SPIRIT___,RusGIS,optimist,ArturRush,Genaloid,anton_sh,Siont,sergeif,iSperia,Varlamov_AD,Rybych,Melron_Torkin,GSerge,logical8,inventor95,alex270295,alex.tsitsura,Vark,moden,Arturian,cjey,zn-soft,alexions,shpongle,efiminem,belyjz,ignorer,outzzz,Daramant,DeltA,ajto,shek_shek,Bogotoff,mike_4d,i.surmin,can_mftac,Ant,ykaland,GoodKid,theShade,glebasikmail.ru,Chestnut,mopdobopot,AleksBannikov,Kotenko,AndruKrug,axiskgn,972,vtyulb,Enavik,jylilov,Kamilot,Flash2048,TongoHiti,eaglegor,JayTord,slava,furyroad,grapefroot,En_taro_adun,VLJ,xblondee,Khao,bearf,Finist,einster,sleipnir,Gladiator_Y,Redkiy,bucash,Gorchay,tatyanka66693,ixvil,bait125,RV173,alex591,Mihailburn,FeniksEM,prohor33,Serpent,mrlewap,Lavrentyus,Daneel,erwinnv,westside,AndreaB330,Alcofest,aga.deonix,phts,Enchante_,MesaR,Apocalypse,MaXpaT,denisovlev,SparseMind,Alexyz,quckly,kislas,Hacky,Kerk_Dovan,dimonesto,Fep,snow_shadaw,Fiz,_famafka,Gelon,guilder1333,burning.mustard,DiCom,vadimvolk,velorias,shym98,Flutter,alexanderk23,ekruten,nilzavatar,Diversus,Owl,DeZi,Deadundead,Evernight,yorik,Gerikon,mr.newman,Evilnef,MerliX,Signer,pavel-kv,Magnat,NumberOne,egormkn,sushakov,Cashey,nakilon,Scherbakov,romans02,Guarrawa,asfir,pssam,ubermuschi,Drewandrew,Mashiro,KungA,Liaksiejka,Bastoph,mf-side,Mystifier,karovka,saidyn,dmitrii,subboo,sword,rewin,xmanatee,iona,Rumbo,paul_ik,k0rzun1n,EvgeniyZh,mGx,Sanders,Ilya32167,skyramp,sergileon,beaver95,lub_rus,vasylysk,Trinidad,lammi04,Damai,blow05,DimonK,biwboris,artemoniks,JesusPlusPlus,sandr,A13x3y,oparin,fowler,uppi,imsohate,rahimov,icar,Evander,dsp,Minhir,fragment,Kofko,spiker,Mortum5,yozh-tema,penguins,xTANATOSx,Scrblmer,alexei.khatingm,AndrewSt,juvus,Ivnst,kokorins,AntonK,schibir,IvanSchro,alisktl,Antik,ulul,firsaalex,Serafim1st,Bond,lockerbie,EKorobov,kirias,Wsl_F,Keniamin,mrv,ynblpb,cherry-girl,skyfox,petuhovskiy,bug_maker,TurboYoda,brick_btv,Papirosnik,artem.votincev,freebsn,zaoozka,antonchechulin,DevKirill,gatal,LaFut,timer00,GARiK_Carrot,ADze,ilux,StepetS,PretzelBot,Sapphire,antoracle,Andrean4ik,Virgin_Worst,emreu30,Mhyhr,Topakhok,VAV,gli,kopisovaas,texasky,Svinokol,SparkLone,grandrust,ReSY,kostochkin,Master_IVA,aabzac,Plumer,Drentul,TasmanianDevil,13human,xl0e,Scorp,eygz,xtr3m,bamx23,rschnz,NoTimeToWait,a333,valertron,innok96,Madball,superbeller,dkotsur,ScratTver,rumter,danilf16,Morgan,Tikvik,SerP,Morozko,kna.rus,a.oryol,bullz_i,maser,nike10b,waterstream,modemaizer,Scarlet,greg95,buggy-wuggy,rebelraven,Gleb1she,SeriousDen,Kladzey,NutZ,Iriskinn,Inflight,sarchon,amp,morozyan,IMost,M-Mad,Amadeus,kismir,unq,K.Yolshin,lensherr,lalala,WontStopMe,soon,maskitnew,NereWARin,runn3r,Tarolrr,dmitrievkv,Zander,Gvoin,NightStar,dr.12,Vadimyan2,mikhan808,X-Ander,BarsukAlexey,dotBalance,kobiaka,marchuk_a,...............,victor-cr,aides,Mr.Lol,avolchek,hilmekrhu,vasste,Fireworks,zeithaste,Sfaurat,RudyErudyta,azapsh,Wolfit,weterok_ai,Artall64,k2s,crazynx,EnemyOfGiraffe,StrelokCj,Fairhawk,karloid,diniska,cojuer,Piterskuy,ruswizard,undo,thisleonard,myduomilia,ad-eto_drugiye,DmitrySamoyenko,jMind,Moonraker,xacker,pomoshnik,RinesThaix,Vergiliy,geisterkirche,0re1,whoa,doodoocaca,re9ulus,SanDi,Gassa,girakon,anarki,MutaStack,artyom-256,starjedy,irbis,crain,AlexBobkov,Vadimyan3,ave99,terdened,Andrew_Makar,fobbos08,Barricadenick,petruchcho,cups_19280,fastec,MichaelSL,Bones,asdfghjkley,maylat,i_v_a,slavam2605,navispb,movchan74,TAleks,wowanama,Nekrolm,alchemist23,HarryBurns,Computer,didoomaster,245790,lexer,Greycardinalrus,Baz93,eXponenta,sapozhkov,0xdde,woblavobla,shpuljka,AlexzundeR,Lord_Grey,wyndrick,Triman,Programmer_86,kas4enit,Apollon76,GRaAL,KLM,nsk.demin,ips,u1tr0n,SteelRaven,AG-Volk,MadridianFox,anton.schelokov,vokitsok,svrVSPU,Supervoid,JustAMan,lokofan46,marserMD,blizznets,PhannGor,indebox,denisbalyko,_JG_,Daeh0f,MrRandomizer,Azarn,codin4fun,tegArt,Dan555,KeKin,_dd210,vovanz123,T-Rex,striker,Monzarh,ya_ilya,Volv,olegaaaaa,bypeso,RomanStar,lebed.salavat,fractus,BlackCat,afansky,flgdev,Vaulverin,manaevruslan,Naduxa,hahocok,SCRIMERS,HeyKappaKappa,MAD_DEL,mgukov,jne0xff,antoliy.aksenov,__ivan__,aryl11,momoadept,2DKot,aos,badadin,mc.lion,ReshetnikovIvan,pset88,jetzack,cups_23644,Laur_lct,dethariel,arrr,gultai4uk_r,Bogdand,MsNatali,agdk26,AudiTT,cups_19463,Nepobedimych,KhaustovPavel,balta2ar,thevlad,MariaIzobava,snikes,zsmartcat,merzgling,zerlag,s0n1c,deftone,Drakosha,jazzim82,Recar,RomaVT,lanseg,MyrZiK,nightrain,Toxoed,Jonnesch73,CaptainFreedom,MightyDwarf,VioletShadow,eexaxa,nixoid,NutsHell,Denis1997,phpshko,raTaHoa,DREC,DukeKan,artinn,hcpl,ine,vitsum,dasha_bazila,Yarosurabu,AlexDo,Hamster,Raventus,llotar,Shpinderkblw,Eretic,IFighter,Shasd_ds,tarsier,Liza,jenyanorilsk,andrey11,sovaalek,xgetc,Xapac,a.korneev,diuk,EvAn,denyWhite_,Let_It_Rain,weer,theghost777,temagi,Alozavr,wifyer,panyav1n,Galtran,GlebR,Beresta,MrShift,pesua,Shmaiser,olegshatov,Proletariat,theacetoace,spYder,4eyes,qwesqwed,stosloff,Malen11,Actium,pborisov,Ni2c2k,sahchos,rubkaarchi,klisha,wasil,GenNa,r00tman,HiVaccessdenied,Fulborg,Rebel,vovo4ka,GSazheniuk,podliy166,LeeT,ardt2,sarge_Brain,Pol_uha,coriollon_42,GoToCoding,LARSIK,Lucky,Vasily89,Schemtschik,Timmy,Nike,Hatter,yobaneo,bind,Trit0n,Pe4enie,goto03,kvasovdmitry,Nevermind,CitrusMetal,rngvva,Deaz,m4shell,iovorobiev,Applemoon,Dxoid,guru,Greg,Puchegusa,justgecko,ak79,ShikaSD,Yermakov,jnn,Maks95Ivanovo,TSvitalik,Ruslion,Shift,Helgi17,eeexception,Fexolm,wasiwih,show,missingdays,anna_moshkina,cups_17467,SoLRoN,ATwice291,MadKnight,margo,gr1ev0us,Kirundel,Irkenny,smbddd,SizeM,KP0H,GLAUBEROV,Ilnaz1994,rulsan,Corwin,cNoNim,xakepob,balyberdin,annaalkh,dsp25no,Simba,NoraArendt,Fram,workres,prizraksarvar,MaximoN,rekzi,chaachii,HG89,Andrey2888,speedflyer,MonteCristo,zhuk2303,Sancho-Pancho,Dispater,andygluk,mibiha,Hromosom,Lyane,invention,astepanov,kirillxcore,Mang,dboev,Grino,Bios,phlegmatik,shturo_mikhail,freeRunner,serg7c,igabaydulin,Hardept";

var r2="santa324,Antmsu,Mr.Smile,Oxidize,Karkun,bratva,MagAlex,SKolotienko,DVS,Lev,Stef,SDil,tyamgin,cha0ss,Angor,ud1,Ixanezis,alex_sh,FDoKE,ruspartisan,271828182845904,andregc,Romka,Levatol,mixei4,novich-OK,GreenTea,NanoBones,jetblack,olsh,planB,kirimedia,Adler,Spumote,Firen95,Redstar,mr.newman,Eleonora,tvv766,Evgenykz,GeoGraf,Serik,kudinov.mikhail,serlis,GreenHorsy,paul_ik,gepard21,nmakarov,Valdemar,latikov,martem1995,JustAMan,OrickBy,rekcahd,Leos,ipris,subboo,Sanders,chis,Hohol,Alick,azt-yur,Wisp93,and0,Omelianenko,pavel-kv,RigFox,alkozel,strobetm,GeneralHaos,AdmiralShadow,pr1k0l,err502,AndreySiunov,makarovks,eigenein,danmerey,StarCuriosity,jimor,lama,Poma,zloy.,fitialovks,anzu,reat,uppi,juvus,aBv,ilya_,vladster,Astw,tairesh,Aegro,mustang,zoldatoff,Serpent,znak4,white2302,P_YegreS_P,MakArt,alberist,oreshnik,DistinGa,MrPingvi,yozh-tema,icar,Headhunter,stem,SparseMind,Olaf,ferc,turbotankist,popolit,VLJ,Shatim,furyroad,bearf,dbf,cheeser,YaguarVL,topspin,altais,narutofan,Mashiro,tjden,Igorjan94,advokat,Foxager,4way,girad,AndruKrug,Alexander_USU,bpa,grandrust,Enchante_,fair_enough,k0rzun1n,Wierus,sergeif,wertrix,Tehnar,mopdobopot,SemikX,Eran,anon410,Execrable,iSperia,Andronnix,longloaf,ReSY,anton_sh,dmitrii,mi5,JlaHceJloT,Santay,kirdark,a.bazhin,dsp,Olegnv,DeltA,theShade,Fame,kislas,Anisimov,i-tikhonov,Magnat,quckly,Sirius,fu-tyan,AlexeyN,ludkich,alevlaber,tws,FlaBla,DiCom,Flash2048,artemoniks,cjey,capizza,bucash,jylilov,bear,Croohand,SLavaLL,Skyfire,alexions,komendart,Vark,morozec,byserge,phts,BudAlNik,turbodestroyer,Alcofest,Impuls,Alkev,Bolduin,Chestnut,gohard,Mystifier,Mr_Alone,Wotan192,RV173,ProGGG,BurningNegr,BeamOfLight,GSerge,Rybych,dimir,ManGeorge,Kotenko,Volandpro,Enavik,temak,Big_Z,DeeCo,Eugene713,xTANATOSx,wide.wrd,PROGER,snw1,burning.mustard,Jatana,cadavrorum,Vadimyan,evarand,Genaloid,akacoder,RKB,Ancient_mage,axiskgn,dobord,marserMD,zomac,Ant,MerliX,griboedov,MesaR,tatyanka66693,NutZ,efiminem,outzzz,Signer,Siont,belyjz,clamoris,logical8,zinya,sslotin,Sneer,PolyProgrammist,alladdin,1337,vvv1559,ReMaker,ubermuschi,ya_ilya,ak79,__SPIRIT___,IlyaSM,vladimir,Rensa,Woogy,alex.tsitsura,erwinnv,mGx,FirstStorm,ekruten,udwarf,Varlamov_AD,aplayt,RusGIS,qaa12,PretzelBot,Vaden,MaxPylypovych,denisovlev,psinetron,einster,AndreaB330,Yura_Sultonov,kvld,KostinOleg,shpongle,perevodchik228,Psirex,jacka7,nikolaev,ALEXks,ignorer,sergileon,alex270295,inventor95,norpadon,Spartan,TongoHiti,Arturian,Finist,Rety,cahq,mrlewap,Kannagi,mike_4d,sleipnir,AleksBannikov,Sominus,GoodKid,YukkaSarasti,Laer,972,optimist,miniJoker,ykaland,Hacky,moden,Evernight,Melron_Torkin,Gladiator_Y,AntonT,alex700,eaglegor,Daramant,Alexyz,velorias,vasste,vtyulb,saidyn,ArturRush,RegressCheck,vedas,Owl,bait125,sildc,can_mftac,xblondee,lub_rus,shek_shek,Gerikon,Zimbabwe23,slava,Rempler,AlexBoyko,En_taro_adun,alex591,i.surmin,Redkiy,Khao,glebasikmail.ru,grapefroot,Mihailburn,FOGY,Bogotoff,Gorchay,ajto,iakolzin,JayTord,ixvil,zn-soft,Zanoza,Kamilot";

var r3="santa324,Angor,SDil,ud1,SKolotienko,Karkun,Mr.Smile,Antmsu,tyamgin,271828182845904,nmakarov,Valdemar,Levatol,MagAlex,Ixanezis,Romka,tvv766,Aegro,Lev,bratva,FDoKE,chis,rekcahd,Oxidize,GreenTea,Stef,planB,alex_sh,OrickBy,ruspartisan,advokat,gepard21,mixei4,Firen95,andregc,serlis,Adler,Serik,GreenHorsy,novich-OK,DVS,udalov,NanoBones,DistinGa,jimor,olsh,paul_ik,kirimedia,Igorjan94,latikov,jetblack,GeoGraf,Evgenykz,Spumote,kudinov.mikhail,mr.newman,Redstar,Melron_Torkin,Eleonora,cha0ss";

var out=r3.split(",");var r3arr=r3.split(",");var r2arr=r2.split(",");

var arr=document.getElementsByTagName("table");
//for(var i=0;i<arr.length;i++)
var f=d=>
{
  var s=d.innerHTML;
  function pad(nr,n,str){var n=n-String(nr).length+1;return Array(n<0?0:n).join(str||'0')+nr;}
  for(var i=0;i<out.length;i++){var k=out[i];s=s.split(">"+k+"<").join(">["+pad((1+i)+"",2,"0")+"] "+k+"<");}
  //for(var i=0;i<r2arr.length&&i<80;i++){var k=r2arr[i];var e=r3arr.indexOf(k);e=e<0&&i<80?"OFF!":(i>50&&e>=0?e+1+" SHIT!":e+1);s=s.split(">"+k+"<").join(">["+pad((e)+"",2,"0")+"] "+k+"<");}
  d.innerHTML=s;
};
f(arr[1]);
f(arr[3]);
f(arr[4]);
f(arr[5]);
