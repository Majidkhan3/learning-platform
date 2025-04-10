'use client';

import properties1 from '@/assets/images/properties/p-1.jpg';
import properties2 from '@/assets/images/properties/p-2.jpg';
import properties3 from '@/assets/images/properties/p-3.jpg';
import properties4 from '@/assets/images/properties/p-4.jpg';
import properties5 from '@/assets/images/properties/p-5.jpg';
import trophyImg from '@/assets/images/trophy.png';
import avatar2 from '@/assets/images/users/avatar-2.jpg';
import { WorldVectorMap } from '@/components/VectorMap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardHeader, CardTitle, Carousel, CarouselItem, Col, Row } from 'react-bootstrap';
import AgentDetailsCard from './AgentDetailsCard';
const AgentDetails = () => {
  const salesLocationOptions = {
    map: 'world',
    zoomOnScroll: true,
    zoomButtons: false,
    markersSelectable: true,
    markers: [{
      name: 'Canada',
      coords: [56.1304, -106.3468]
    }, {
      name: 'Brazil',
      coords: [-14.235, -51.9253]
    }, {
      name: 'Russia',
      coords: [61, 105]
    }, {
      name: 'China',
      coords: [35.8617, 104.1954]
    }, {
      name: 'United States',
      coords: [37.0902, -95.7129]
    }],
    markerStyle: {
      initial: {
        fill: '#7f56da'
      },
      selected: {
        fill: '#1bb394'
      }
    },
    labels: {
      markers: {
        // render: (marker) => marker.name,
      }
    },
    regionStyle: {
      initial: {
        fill: 'rgba(169,183,197, 0.3)',
        fillOpacity: 1
      }
    }
  };
  return <Row className="justify-content-center">
      <Col xl={8} lg={12}>
        <AgentDetailsCard />
      </Col>
      <Col xl={4} lg={12}>
        <Card className="bg-light-subtle overflow-hidden z-1">
          <CardBody>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Image src={avatar2} alt="avatar" className="avatar-md rounded-circle" />
              <div className="d-block">
                <h5 className="text-dark fw-medium">Michael A. Miner</h5>
                <p className=" mb-0 fw-medium">#1 Medal</p>
              </div>
              <div className="ms-auto">
                <div className="avatar bg-primary-subtle rounded flex-centered">
                  <IconifyIcon width={28} height={28} icon="solar:cup-star-bold" className="fs-28 text-primary" />
                </div>
              </div>
            </div>
            <div className="p-3 position-relative overflow-hidden z-1 rounded bg-primary-subtle border border-primary-subtle mt-4 text-center">
              <Image src={trophyImg} alt="trophyImg" className="mx-auto" height={150} width={150} />
              <span className="position-absolute top-0 end-0 m-1 badge text-light bg-danger px-2 py-1 fs-12"># 1</span>
              <div className="position-absolute top-50 start-50 translate-middle z-n1 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 800" width={400} height={400}>
                  <defs>
                    <filter id="bbburst-blur-1" x="-100%" y="-100%" width="400%" height="400%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation={1} />
                    </filter>
                    <filter id="bbburst-blur-2" x="-100%" y="-100%" width="400%" height="400%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation={2} />
                    </filter>
                    <filter id="bbburst-blur-3" x="-100%" y="-100%" width="400%" height="400%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation={4} />
                    </filter>
                    <filter id="bbburst-blur-4" x="-100%" y="-100%" width="400%" height="400%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation={12} />
                    </filter>
                    <symbol id="bbburst-shape-1" viewBox="0 0 194 167">
                      <path d="m97 0 96.129 166.5H.871L97 0Z" />
                    </symbol>
                    <symbol id="bbburst-shape-4" viewBox="0 0 149 143">
                      <path d="M71.647 2.781c.898-2.764 4.808-2.764 5.706 0l15.445 47.534a3 3 0 0 0 2.853 2.073h49.98c2.906 0 4.115 3.719 1.764 5.427L106.96 87.193a2.999 2.999 0 0 0-1.09 3.354l15.445 47.534c.898 2.764-2.266 5.062-4.617 3.354l-40.435-29.378a3 3 0 0 0-3.526 0l-40.435 29.378c-2.351 1.708-5.515-.59-4.617-3.354L43.13 90.547a3 3 0 0 0-1.09-3.354L1.605 57.815c-2.35-1.708-1.142-5.427 1.764-5.427h49.98a3 3 0 0 0 2.853-2.073L71.647 2.781Z" />
                    </symbol>
                    <symbol id="bbburst-shape-6" viewBox="0 0 133 116">
                      <path d="M59.7487 10.2513c-13.6683-13.66839-35.8291-13.66839-49.4974 0-13.66839 13.6683-13.66839 35.8291 0 49.4974l49.4974-49.4974ZM66.5 66.5 41.7513 91.2487 66.5 115.997l24.7487-24.7483L66.5 66.5Zm56.249-6.7513c13.668-13.6683 13.668-35.8291 0-49.4974-13.669-13.66839-35.8294-13.66839-49.4977 0l49.4977 49.4974Zm-112.4977 0 31.5 31.5 49.4974-49.4974-31.5-31.5-49.4974 49.4974Zm80.9974 31.5 31.5003-31.5-49.4977-49.4974-31.5 31.5 49.4974 49.4974Z" />
                    </symbol>
                    <symbol id="bbburst-shape-8" viewBox="0 0 87 168">
                      <path d="m12 12 31.2546 18.0749c16.4102 9.4902 20.014 31.6325 7.4603 45.8369L36.3296 92.1884c-12.5684 14.2206-8.9394 36.3916 7.5068 45.8636L75 156" strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
                    </symbol>
                    <symbol id="bbburst-shape-10" viewBox="0 0 145 145">
                      <circle cx="72.5" cy="72.5" r="61.5" fill="none" strokeWidth={22} />
                    </symbol>
                  </defs>
                  <use xlinkHref="#bbburst-shape-6" width="42.7645635972241" opacity="-0.07170930593208524" transform="matrix(1.6526711594398502,-0.5754807023313131,0.5754807023313131,1.6526711594398502,-208.95529848116416,-587.3516463083347)" fill="#ff5c58" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-6" width="24.45268163114131" opacity="0.6238328430200086" transform="matrix(0.9386727757288379,0.3448092517690307,-0.3448092517690307,0.9386727757288379,532.9877083917494,-148.83342225578508)" fill="#00a19d" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-6" width="30.454276035972466" opacity="0.19126324041346" transform="matrix(1.2281308116653258,0.23279757180492255,-0.23279757180492255,1.2281308116653258,750.8439830146688,141.92007821728635)" fill="#00a19d" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-4" width="27.488636503494444" opacity="0.12187606864879164" transform="matrix(0.9545507788420095,0.8070519255984172,-0.8070519255984172,0.9545507788420095,870.4769229770454,-353.8497529328647)" fill="#ffbd9b" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-6" width="32.254817717847224" opacity="0.5112244876552516" transform="matrix(0.915706425996272,0.40184790828015254,-0.40184790828015254,0.915706425996272,346.30260123269477,-65.01300650116087)" fill="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-8" width="20.21442586691213" opacity="0.7980318861011595" transform="matrix(0.9276234643061629,0.37351667763117724,-0.37351667763117724,0.9276234643061629,449.4818342922476,32.98892380865095)" fill="none" stroke="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-1" width="27.134020468164294" opacity="0.18702378771218708" transform="matrix(1.1278902211961048,-0.5388540144883416,0.5388540144883416,1.1278902211961048,534.5821125515372,-26.02576397983802)" fill="#ff5c58" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-1" width="30.97345221107374" opacity="0.5485864014593227" transform="matrix(0.7532193948720056,0.6577693692994907,-0.6577693692994907,0.7532193948720056,689.3291782131198,288.12242233703654)" fill="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-10" width="26.405381228888885" opacity="0.19337165589242467" transform="matrix(1.113325535279088,-0.5683363902615526,0.5683363902615526,1.113325535279088,133.7553925153216,324.3477668784682)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-6" width="20.80218050506912" opacity="0.6268740089471321" transform="matrix(0.7910466730728583,-0.6117558017872511,0.6117558017872511,0.7910466730728583,-16.015932347447375,49.99927627938513)" fill="#ffa6d5" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-8" width="29.996757481902492" opacity="0.5053598408190325" transform="matrix(0.778377828694753,0.6277961100520151,-0.6277961100520151,0.778377828694753,818.185421062104,211.88647181084565)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-4" width="18.207236504599862" opacity="0.6889166670322748" transform="matrix(0.999889136446447,-0.014890091214584187,0.014890091214584187,0.999889136446447,502.87136921670486,-75.22948530623756)" fill="#ffa6d5" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-10" width="33.96163868797385" opacity="0.029175559445910992" transform="matrix(1.7430963796322434,0.15529008761980498,-0.15529008761980498,1.7430963796322434,792.4076091621677,-52.21662505298559)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-4" width="28.056793640934977" opacity="0.5000492880886687" transform="matrix(0.9051613828988044,-0.42506807796954593,0.42506807796954593,0.9051613828988044,199.14980915441092,-180.3241119534908)" fill="#ff5c58" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-10" width="24.716309224385068" opacity="0.4206325642902956" transform="matrix(0.9921317668843107,0.125198071626586,-0.125198071626586,0.9921317668843107,677.0384399266816,-102.06391867096653)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-10" width="35.541517130951746" opacity="0.42845409874613516" transform="matrix(0.9921766508252325,0.12484187421384131,-0.12484187421384131,0.9921766508252325,189.62192376834145,86.08425987065573)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-1" width="38.01068509323866" opacity="0.3258437211029286" transform="matrix(0.944841087078961,-0.8183980206277673,0.8183980206277673,0.944841087078961,-248.459221879349,48.320986967694125)" fill="#2c2891" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-4" width="29.24502412758138" opacity="0.5902447666423021" transform="matrix(0.9510651348898608,-0.30899046780917194,0.30899046780917194,0.9510651348898608,190.07567800269965,-145.45146590347088)" fill="#ffa6d5" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-6" width="49.36590703849126" opacity="0.19826035614605375" transform="matrix(1.1311722104551456,-0.5319299110728968,0.5319299110728968,1.1311722104551456,-83.49863473058173,227.51215700873922)" fill="#ffa6d5" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-6" width="27.360087102678115" opacity="0.5738512230056199" transform="matrix(0.8425221768277505,-0.5386616577717673,0.5386616577717673,0.8425221768277505,4.749333228200555,162.35483386422334)" fill="#ffbd9b" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-10" width="14.09970057460975" opacity="0.9153724768144158" transform="matrix(0.994088205753386,0.10857549991602099,-0.10857549991602099,0.994088205753386,426.89945260671476,-35.27332354094278)" fill="none" stroke="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-4" width="30.263128319955847" opacity="0.3604346911205569" transform="matrix(0.9934409432373326,0.11434636985807187,-0.11434636985807187,0.9934409432373326,623.6206098128381,214.49544322076844)" fill="#ffbd9b" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-1" width="18.315561816155817" opacity="0.7872019667652703" transform="matrix(0.9530509308877397,-0.3028100446385701,0.3028100446385701,0.9530509308877397,364.98588930164493,34.8779712475565)" fill="#00a19d" />
                  <use xlinkHref="#bbburst-shape-1" width="28.010213615578664" opacity="0.46266843907030153" transform="matrix(0.8768788161284009,0.48071149541617375,-0.48071149541617375,0.8768788161284009,809.3199274646857,119.18334004633482)" fill="#2c2891" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-1" width="33.09795791994925" opacity="0.42309942111380605" transform="matrix(0.9996886767191043,0.024950944663602995,-0.024950944663602995,0.9996886767191043,309.351111289664,-245.85664485141194)" fill="#2c2891" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-4" width="38.64139138894649" opacity="0.3393258208844824" transform="matrix(0.9699793144683696,0.24318743697706047,-0.24318743697706047,0.9699793144683696,196.7523053739348,-87.48795535330828)" fill="#ff5c58" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-1" width="39.21931205625753" opacity="0.37611505023029734" transform="matrix(0.9657506004722615,0.2594721135063773,-0.2594721135063773,0.9657506004722615,694.7326712900791,-177.7897691715119)" fill="#00a19d" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-8" width="26.71293849985137" opacity="0.7241258630588089" transform="matrix(0.9998236559228544,0.01877916550482671,-0.01877916550482671,0.9998236559228544,292.033710211246,70.40506156898095)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-6" width="24.01696828060861" opacity="0.6891592482245072" transform="matrix(0.7192485971798049,-0.6947528016891208,0.6947528016891208,0.7192485971798049,200.09702497503991,10.824222132722298)" fill="#ffbd9b" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-4" width="30.188856410028137" opacity="0.06917007541392017" transform="matrix(1.4859125012987524,0.9244263293979057,-0.9244263293979057,1.4859125012987524,1110.6216787030294,-416.7583293841506)" fill="#2c2891" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-8" width="16.414256106847827" opacity="0.7442708307775789" transform="matrix(0.9709135066915081,-0.23943049622802598,0.23943049622802598,0.9709135066915081,398.48398415074155,66.44945598785768)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-4" width="18.495473361280155" opacity="0.7169470847933221" transform="matrix(0.7338878192099325,0.6792706889122255,-0.6792706889122255,0.7338878192099325,602.7951378566083,-11.02629165460155)" fill="#ff5c58" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-6" width="23.199458645077737" opacity="0.735162071800652" transform="matrix(0.8532308139238155,0.5215334871040433,-0.5215334871040433,0.8532308139238155,636.2521346192751,-60.453263555281865)" fill="#ffa6d5" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-10" width="31.927193678380736" opacity="0.3050173291592715" transform="matrix(1.243713709449363,0.1252046681546061,-0.1252046681546061,1.243713709449363,527.3253308109552,-396.7715008617972)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-6" width="17.21495340709956" opacity="0.8565374593855011" transform="matrix(0.7612440816706001,0.6484654563825931,-0.6484654563825931,0.7612440816706001,711.9013575126655,115.97386030286663)" fill="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-6" width="21.300675210927587" opacity="0.5491249080421088" transform="matrix(0.7828182237827475,0.6222504548119064,-0.6222504548119064,0.7828182237827475,816.7130201632856,-20.4368047485587)" fill="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-4" width="12.750636193702919" opacity="0.9567975308884051" transform="matrix(0.8254928265699611,0.5644126090738371,-0.5644126090738371,0.8254928265699611,632.1282479123586,50.63715406519566)" fill="#ff5c58" />
                  <use xlinkHref="#bbburst-shape-6" width="21.147442236423064" opacity="0.5439326814941108" transform="matrix(0.9479827903420983,-0.31832158144745587,0.31832158144745587,0.9479827903420983,466.55726998494896,47.41907240067991)" fill="#2c2891" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-4" width="14.50546007293818" opacity="0.7817985532892582" transform="matrix(0.9435282796747354,0.33129199424983735,-0.33129199424983735,0.9435282796747354,449.29475580032806,-41.51343903003203)" fill="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-4" width="31.53109512636135" opacity="0.26369648058379946" transform="matrix(1.1432906299798715,0.5053578290679074,-0.5053578290679074,1.1432906299798715,879.2081819168344,-215.90754508133122)" fill="#ffa6d5" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-4" width="29.22429181198515" opacity="0.6574734640415689" transform="matrix(0.8839657704185936,-0.467551619319474,0.467551619319474,0.8839657704185936,48.23166308074698,79.76010847443956)" fill="#2c2891" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-10" width="35.800005953016026" opacity="0.32071532830958127" transform="matrix(0.9036073289190667,-0.8637093232817101,0.8637093232817101,0.9036073289190667,308.54345686124566,196.95141044781445)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-10" width="35.147341067465746" opacity="0.19414369178454016" transform="matrix(0.9354444327770889,0.8291222546683634,-0.8291222546683634,0.9354444327770889,419.55003643801797,-198.7240356953939)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-4" width="34.2680249182761" opacity="0.0922658582232101" transform="matrix(1.4712039716747807,-0.9476596824432026,0.9476596824432026,1.4712039716747807,-202.07276038036494,185.17970459531637)" fill="#ffa6d5" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-1" width="39.30061937181051" opacity="0.16723031492059137" transform="matrix(1.2464004207971784,-0.09479446733125513,0.09479446733125513,1.2464004207971784,91.9807018823375,-379.66877636587924)" fill="#00a19d" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-10" width="32.525247577707205" opacity="0.5050053416666258" transform="matrix(0.8902034346617496,0.45556321725576593,-0.45556321725576593,0.8902034346617496,345.0269175244564,33.09040937290604)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-6" width="25.325835692969747" opacity="0.5266450285848325" transform="matrix(0.9269348917324046,0.3752222094826415,-0.3752222094826415,0.9269348917324046,394.4980794457795,-132.62206351085948)" fill="#00a19d" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-1" width="35.8702206187409" opacity="0.24740685437622134" transform="matrix(1.2308958610169427,-0.21770479859516084,0.21770479859516084,1.2308958610169427,485.32872120817655,-365.65858804536964)" fill="#ffa6d5" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-8" width="21.1477870942505" opacity="0.7266950733837458" transform="matrix(0.9351319122523568,-0.35429974130282743,0.35429974130282743,0.9351319122523568,235.8085304301906,-92.64820619517002)" fill="none" stroke="#ffbd9b" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-8" width="33.86828563020525" opacity="0.23828492031492088" transform="matrix(1.2493757698868586,-0.03949918505006509,0.03949918505006509,1.2493757698868586,228.31174600877253,-414.263798924588)" fill="none" stroke="#ffbd9b" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-6" width="24.260175463994955" opacity="0.46229668243450106" transform="matrix(0.8082334458384155,0.5888622054675958,-0.5888622054675958,0.8082334458384155,675.9661578983375,-167.13254546113185)" fill="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-4" width="39.60864727470894" opacity="0.3659016781653087" transform="matrix(0.9079905278799956,-0.41899069354844504,0.41899069354844504,0.9079905278799956,48.39470731069778,-186.92482101060082)" fill="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-1" width="12.845945714783296" opacity="0.8677718748903157" transform="matrix(0.9642242479548268,-0.26508790929793247,0.26508790929793247,0.9642242479548268,314.95406633527693,68.96207951419393)" fill="#ffbd9b" />
                  <use xlinkHref="#bbburst-shape-8" width="25.013283693681192" opacity="0.5813242157731491" transform="matrix(0.7225997179824,0.691266697861076,-0.691266697861076,0.7225997179824,548.8926362605508,248.7239115700242)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-10" width="37.369655570915" opacity="-0.0787107941409122" transform="matrix(1.5869141817251493,0.7377014164549229,-0.7377014164549229,1.5869141817251493,1000.3441569132965,102.82561806958302)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-10" width="18.204280700796595" opacity="0.8435151418189477" transform="matrix(0.8617576606551368,0.5073201497104033,-0.5073201497104033,0.8617576606551368,616.7349282081275,-16.32798776725315)" fill="none" stroke="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-10" width="52.909754033282134" opacity="-0.06786226156281772" transform="matrix(1.555381142228197,0.8020533039648361,-0.8020533039648361,1.555381142228197,344.6485292030916,101.12140506636297)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-4" width="25.210164615735618" opacity="0.5535194468905071" transform="matrix(0.8536538733101535,0.5208407286134336,-0.5208407286134336,0.8536538733101535,734.8237015518342,-94.72843903889307)" fill="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-4" width="23.21089456466773" opacity="0.6798741601967252" transform="matrix(0.7650407406891989,-0.6439818825756839,0.6439818825756839,0.7650407406891989,277.1024614188464,113.42129099078699)" fill="#ff5c58" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-4" width="29.453174362143724" opacity="0.5143540555045474" transform="matrix(0.9246518483465198,0.38081354932481665,-0.38081354932481665,0.9246518483465198,754.8208019565492,-7.8641264495492464)" fill="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-8" width="39.28482030228723" opacity="0.18031701051195026" transform="matrix(1.2446114929006116,-0.11594063886192249,0.11594063886192249,1.2446114929006116,-33.00471385340908,-165.42743227666597)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-10" width="22.957759123804262" opacity="0.1711035209732742" transform="matrix(1.2393915569652,0.16250713376149775,-0.16250713376149775,1.2393915569652,380.10268179042447,-463.86897768838196)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-6" width="10.634420968893473" opacity="0.8945395237101992" transform="matrix(0.8707097466284811,-0.49179725205227237,0.49179725205227237,0.8707097466284811,237.18502640823823,26.630134227198482)" fill="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-8" width="27.901568340528556" opacity="0.69906839424639" transform="matrix(0.937320653688959,-0.34846806477509906,0.34846806477509906,0.937320653688959,296.926600976792,156.02428054696634)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-10" width="28.46356298917959" opacity="0.5939171074818335" transform="matrix(0.7651309467555046,-0.643874703895894,0.643874703895894,0.7651309467555046,203.39796261117954,-64.91376720739723)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-10" width="13.833516894509279" opacity="0.8434846417930874" transform="matrix(0.9999608545054298,-0.008848132953945107,0.008848132953945107,0.9999608545054298,457.936879986381,-16.74885511948395)" fill="none" stroke="#00a19d" />
                  <use xlinkHref="#bbburst-shape-6" width="39.042004054710816" opacity="0.37064590341358306" transform="matrix(0.8261383724810795,0.5634672923198942,-0.5634672923198942,0.8261383724810795,383.24971422012584,-112.12093093846366)" fill="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-4" width="10.845372931377684" opacity="0.9318668027087007" transform="matrix(0.9902842584457509,-0.13905785657254058,0.13905785657254058,0.9902842584457509,366.57016720964907,18.080287843551446)" fill="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-10" width="26.560629989897677" opacity="0.6563346744277492" transform="matrix(0.9987433197183859,0.05011767470561549,-0.05011767470561549,0.9987433197183859,285.99329596246355,-96.73501546313622)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-4" width="19.228083856032107" opacity="0.8062571738749984" transform="matrix(0.7403798651803654,-0.6721887050787926,0.6721887050787926,0.7403798651803654,125.21549327426527,197.49949204728193)" fill="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-6" width="23.737008492524538" opacity="0.6898394019102103" transform="matrix(0.9593825157087896,-0.2821084694798687,0.2821084694798687,0.9593825157087896,269.60249716861256,159.03137167330976)" fill="#ff5c58" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-1" width="20.772909215259418" opacity="0.7176196163846472" transform="matrix(0.7344204170698702,0.6786948143244635,-0.6786948143244635,0.7344204170698702,604.8551750232273,211.75825169327402)" fill="#2c2891" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-8" width="16.476256174205822" opacity="0.8237545673492574" transform="matrix(0.8461592203729731,-0.532930177206923,0.532930177206923,0.8461592203729731,157.95718632889378,-10.300218039849199)" fill="none" stroke="#00a19d" />
                  <use xlinkHref="#bbburst-shape-4" width="36.14229553272207" opacity="0.4072944788612678" transform="matrix(0.8673586207896838,-0.49768365749923654,0.49768365749923654,0.8673586207896838,57.023707619723666,295.9407845022058)" fill="#00a19d" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-10" width="21.587245893708495" opacity="0.7899533466776378" transform="matrix(0.7494234714667896,-0.6620909759350795,0.6620909759350795,0.7494234714667896,186.1408350759649,181.16992381291857)" fill="none" stroke="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-10" width="18.67507546717053" opacity="0.7984954393978203" transform="matrix(0.9994626353264713,-0.032778660531894044,0.032778660531894044,0.9994626353264713,443.5516221768584,-61.663433563390356)" fill="none" stroke="#00a19d" />
                  <use xlinkHref="#bbburst-shape-8" width="27.018259171683557" opacity="0.05845173186589514" transform="matrix(1.3851717041909914,1.0694855538569112,-1.0694855538569112,1.3851717041909914,593.1893256234113,-533.0839111141656)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-4" width="15.598436966438527" opacity="0.9087164923894808" transform="matrix(0.8474439175036452,-0.5308849279138323,0.5308849279138323,0.8474439175036452,140.0540169907555,62.495908339104176)" fill="#ffbd9b" />
                  <use xlinkHref="#bbburst-shape-8" width="14.164965963953524" opacity="0.9698618231186102" transform="matrix(0.7392290552133031,0.6734540844990454,-0.6734540844990454,0.7392290552133031,653.8163304145437,108.32668420953183)" fill="none" stroke="#2c2891" />
                  <use xlinkHref="#bbburst-shape-8" width="18.238199423119443" opacity="0.8305660465380384" transform="matrix(0.7706754402639834,0.637227875860681,-0.637227875860681,0.7706754402639834,606.5233711385528,149.9841130432746)" fill="none" stroke="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-8" width="41.539052467513656" opacity="-0.09050395661000366" transform="matrix(1.5684329105859391,-0.7762204615899532,0.7762204615899532,1.5684329105859391,414.3658547015533,-547.4906020137084)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-10" width="16.349845582621192" opacity="0.9083274344896377" transform="matrix(0.9569628538359253,0.29021043464734597,-0.29021043464734597,0.9569628538359253,500.40264680386014,55.33965466233036)" fill="none" stroke="#00a19d" />
                  <use xlinkHref="#bbburst-shape-4" width="35.64569277451549" opacity="0.25740832965588323" transform="matrix(0.9852006181519832,-0.7693372095466007,0.7693372095466007,0.9852006181519832,-221.73041989017224,173.86392314344806)" fill="#ff5c58" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-8" width="34.05174598539992" opacity="0.14396842500670715" transform="matrix(1.2357356940674196,-0.18830107383579286,0.18830107383579286,1.2357356940674196,441.7037740256212,268.53430770515604)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-4" width="26.011017659943573" opacity="0.66665291366817" transform="matrix(0.9666000297949311,-0.2562896455193583,0.2562896455193583,0.9666000297949311,390.4759451005265,123.29739446208686)" fill="#ffa6d5" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-4" width="21.88722049534323" opacity="0.6387157415381061" transform="matrix(0.9115005518203959,0.41129885002405936,-0.41129885002405936,0.9115005518203959,711.9447434170219,-9.754366283997399)" fill="#00a19d" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-1" width="38.71217696186474" opacity="0.17660321822992575" transform="matrix(0.9917241428224849,-0.7609094719761396,0.7609094719761396,0.9917241428224849,-285.8838932737252,95.45136351977766)" fill="#2c2891" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-10" width="32.87086934061768" opacity="0.4337541695089554" transform="matrix(0.8667441899578585,-0.4987529540506961,0.4987529540506961,0.8667441899578585,316.25519680460343,-157.65338337126423)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-4" width="32.89601614688991" opacity="0.17522664985330927" transform="matrix(1.2499520695901698,0.01094640247987557,-0.01094640247987557,1.2499520695901698,744.1095507912003,-189.2388349535085)" fill="#00a19d" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-6" width="41.520912394170445" opacity="0.3266616966902913" transform="matrix(1.1595890680731706,-0.46674746191617983,0.46674746191617983,1.1595890680731706,177.68604165911415,-356.9275511145755)" fill="#2c2891" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-10" width="47.59848009088071" opacity="0.06674070438917634" transform="matrix(1.5832624156164523,0.745506621899736,-0.745506621899736,1.5832624156164523,305.51799244651846,-26.67270154182279)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-8" width="12.354823324618726" opacity="0.8489621477907312" transform="matrix(0.769523901642491,0.6386180116477439,-0.6386180116477439,0.769523901642491,590.7959639192078,120.36703934055606)" fill="none" stroke="#ffa6d5" />
                  <use xlinkHref="#bbburst-shape-6" width="16.657637744352755" opacity="0.7404527265010101" transform="matrix(0.9719737913453854,0.23508923611615465,-0.23508923611615465,0.9719737913453854,373.08986882189646,-20.849758861945702)" fill="#00a19d" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-6" width="30.08245795482894" opacity="0.5648413685746597" transform="matrix(0.9129891456833006,0.40798384755340134,-0.40798384755340134,0.9129891456833006,498.02296530723834,217.61290200904563)" fill="#00a19d" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-6" width="20.745148624702356" opacity="0.6232558986015112" transform="matrix(0.7432660398546442,-0.6689959596281538,0.6689959596281538,0.7432660398546442,279.0899382653495,179.65725717622468)" fill="#ffbd9b" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-10" width="35.746354001222855" opacity="0.07218670900225455" transform="matrix(1.2862386900234992,-1.1866296946759056,1.1866296946759056,1.2862386900234992,-462.9744833578062,-295.40315155268286)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-6" width="31.69924146312217" opacity="0.18164077832966563" transform="matrix(1.2274866325431149,-0.23617063095983004,0.23617063095983004,1.2274866325431149,334.24040346919344,-452.34948676309904)" fill="#ffa6d5" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-10" width="32.21674853106318" opacity="0.4141589526058813" transform="matrix(0.97557237934913,-0.21967824801531255,0.21967824801531255,0.97557237934913,282.0142467267482,276.54462178381743)" fill="none" stroke="#ffbd9b" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-6" width="40.13839269627302" opacity="0.11250386698903314" transform="matrix(1.247230224225941,0.08316710754444333,-0.08316710754444333,1.247230224225941,632.7593533533452,229.7244357998593)" fill="#00a19d" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-1" width="38.14297801018778" opacity="0.26131988150186636" transform="matrix(0.9629163577562899,-0.7970521237443389,0.7970521237443389,0.9629163577562899,122.61969526738875,357.0708362851349)" fill="#ffa6d5" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-4" width="40.25301122156451" opacity="0.3780422860311119" transform="matrix(0.7358481630516079,-0.6771465727104984,0.6771465727104984,0.7358481630516079,231.18469219077235,373.64756193320096)" fill="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-1" width="17.97153101928128" opacity="0.7543657761560949" transform="matrix(0.7530564933292847,-0.6579558631508658,0.6579558631508658,0.7530564933292847,237.1665332479168,77.36524124916457)" fill="#ff5c58" filter="url(#bbburst-blur-1)" />
                  <use xlinkHref="#bbburst-shape-6" width="38.93899852893418" opacity="0.35496528824624163" transform="matrix(0.8859802309824817,-0.4637230103286103,0.4637230103286103,0.8859802309824817,485.159332015828,17.637886320495056)" fill="#ffbd9b" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-6" width="30.524344932514406" opacity="0.3302252654478107" transform="matrix(0.9848487168081757,-0.7697876363006161,0.7697876363006161,0.9848487168081757,374.23785335299885,68.03959723188433)" fill="#ffa6d5" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-1" width="32.60627231860304" opacity="0.40278727565196115" transform="matrix(0.8327493695007869,-0.5536501490978233,0.5536501490978233,0.8327493695007869,-36.51965243200101,253.78001168641953)" fill="#ffa6d5" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-4" width="36.482632858792606" opacity="0.15477060304291013" transform="matrix(0.8920306047294922,-0.8756605507991875,0.8756605507991875,0.8920306047294922,317.96276953919903,-193.28815883235225)" fill="#00a19d" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-10" width="41.974399813627386" opacity="0.24616458560912358" transform="matrix(1.156340676813612,0.4747380742538329,-0.4747380742538329,1.156340676813612,459.3513153493535,249.64893832570516)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-3)" />
                  <use xlinkHref="#bbburst-shape-6" width="35.9305091370128" opacity="0.549133718481291" transform="matrix(0.8035518346185494,-0.5952347848380195,0.5952347848380195,0.8035518346185494,257.4781735117211,259.75056943957725)" fill="#00a19d" filter="url(#bbburst-blur-2)" />
                  <use xlinkHref="#bbburst-shape-4" width="14.939857097701156" opacity="0.8647542431585912" transform="matrix(0.9690132101723151,-0.24700890370904574,0.24700890370904574,0.9690132101723151,244.9431267487355,-21.819595012711318)" fill="#2c2891" />
                  <use xlinkHref="#bbburst-shape-6" width="43.38266316833932" opacity="0.01851655686972109" transform="matrix(1.7306792388676078,0.25932483905834786,-0.25932483905834786,1.7306792388676078,730.4535692859321,-651.7807986153905)" fill="#2c2891" filter="url(#bbburst-blur-4)" />
                  <use xlinkHref="#bbburst-shape-4" width="31.809735701830423" opacity="0.1503743315317576" transform="matrix(1.2486216482131127,0.05868542931230446,-0.05868542931230446,1.2486216482131127,761.7259014234368,33.567287052307734)" fill="#ffbd9b" filter="url(#bbburst-blur-3)" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="text-dark mb-0">
                <IconifyIcon icon="ri:coins-fill" className="fs-24 text-primary align-middle" /> 19,343 Collected In This Month
              </h5>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle as="h4">Property Photos</CardTitle>
          </CardHeader>
          <CardBody>
            <Carousel indicators={false}>
              <CarouselItem className="carousel-item active">
                <Image src={properties1} height={305} className="d-block w-100 rounded" alt="img-6" />
                <div className="carousel-caption d-none d-md-block bg-light rounded p-2 text-start">
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar bg-primary rounded flex-centered">
                      <IconifyIcon icon="solar:home-bold-duotone" width={24} height={24} className="fs-24 text-white" />
                    </div>
                    <div>
                      <Link href="" className="text-dark fw-medium fs-16">
                        Dvilla Residences Batu
                      </Link>
                      <p className="text-muted mb-0">4604 , Philli Lane Kiowa</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="carousel-item">
                <Image src={properties2} height={305} className="d-block w-100 rounded" alt="img-7" />
                <div className="carousel-caption d-none d-md-block bg-light rounded p-2 text-start">
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar bg-primary rounded flex-centered">
                      <IconifyIcon icon="solar:home-bold-duotone" width={24} height={24} className="fs-24 text-white" />
                    </div>
                    <div>
                      <Link href="" className="text-dark fw-medium fs-16">
                        PIK Villa House
                      </Link>
                      <p className="text-muted mb-0">27, Boulevard Cockeysville</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="carousel-item">
                <Image src={properties3} height={305} className="d-block w-100 rounded" alt="img-5" />
                <div className="carousel-caption d-none d-md-block bg-light rounded p-2 text-start">
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar bg-primary rounded flex-centered">
                      <IconifyIcon icon="solar:home-bold-duotone" width={24} height={24} className="fs-24 text-white" />
                    </div>
                    <div>
                      <Link href="" className="text-dark fw-medium fs-16">
                        Tungis Luxury
                      </Link>
                      <p className="text-muted mb-0">900 , Creside WI 54913</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="carousel-item">
                <Image src={properties4} height={305} className="d-block w-100 rounded" alt="img-5" />
                <div className="carousel-caption d-none d-md-block bg-light rounded p-2 text-start">
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar bg-primary rounded flex-centered">
                      <IconifyIcon icon="solar:buildings-3-bold-duotone" width={24} height={24} className="fs-24 text-white" />
                    </div>
                    <div>
                      <Link href="" className="text-dark fw-medium fs-16">
                        Luxury Apartment
                      </Link>
                      <p className="text-muted mb-0">223 , Creside Santa Maria</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem className="carousel-item">
                <Image src={properties5} height={305} className="d-block w-100 rounded" alt="img-5" />
                <div className="carousel-caption d-none d-md-block bg-light rounded p-2 text-start">
                  <div className="d-flex align-items-center gap-2">
                    <div className="avatar bg-primary rounded flex-centered">
                      <IconifyIcon icon="solar:home-bold-duotone" width={24} height={24} className="fs-24 text-white" />
                    </div>
                    <div>
                      <Link href="" className="text-dark fw-medium fs-16">
                        Weekend Villa MBH
                      </Link>
                      <p className="text-muted mb-0">980, Jim Rosa Lane Dublin</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </Carousel>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'}>Location</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="my-4" style={{
            height: '228px'
          }}>
              <WorldVectorMap width="100%" options={salesLocationOptions} />
            </div>
            <div className="d-flex align-items-center bg-light justify-content-between p-3 rounded">
              <div>
                <h5 className="fw-medium mb-1 text-dark">Walker Art Center</h5>
                <p className="mb-2">Lincoln Drive Harrisburg, PA 17101 U.S.A</p>
                <div className="d-flex gap-2 align-items-center">
                  <ul className="d-flex text-warning m-0 fs-18  list-unstyled">
                    <li>
                      <IconifyIcon icon="ri:star-fill" />
                    </li>
                    <li>
                      <IconifyIcon icon="ri:star-fill" />
                    </li>
                    <li>
                      <IconifyIcon icon="ri:star-fill" />
                    </li>
                    <li>
                      <IconifyIcon icon="ri:star-fill" />
                    </li>
                    <li>
                      <IconifyIcon icon="ri:star-half-line" />
                    </li>
                  </ul>
                  <p className="mb-0 fw-medium fs-15 text-dark">
                    4.5 <span className="text-muted fs-13">(5809 Review)</span>
                  </p>
                </div>
              </div>
              <div>
                <div className="avatar bg-dark rounded flex-centered">
                  <IconifyIcon icon="solar:point-on-map-perspective-bold" width={30} height={30} className="fs-30 text-light" />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>;
};
export default AgentDetails;