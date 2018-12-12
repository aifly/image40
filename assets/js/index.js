!function(){


            function Face(option){
                var option = option || {};
                this.obj = option.obj;
                this.init();
                this.opacity = 0;
            };

            Face.prototype = {
                constructor:Face,
                init:function(){
                    this.x = 0;
                    this.y = 0;
                    this.vx = Math.random() * -60 - 5;
                    this.vy = Math.random() * -60 -10;
                    this.opacity = 0;
                    this.obj.style.opacity = 0;
                    this.obj.style.transform = 'translate(' + this.x + 'px,' + this.y + 'px)'
                },
                animate:function(){
                    if(this.opacity === 0){
                        this.obj.style.opacity =  1;
                        this.opacity = 1;
                    }
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vy+=Math.random()*3+2;
                    this.obj.style.opacity*=.9;
                    this.obj.style.transform = 'translate('+this.x+'px,'+this.y+'px)'
                },
            };


            

            var util = {
                loading: function(arr, fn, fnEnd) {
                    var len = arr.length;
                    var count = 0;
                    var i = 0;

                    function loadimg() {
                        if (i === len) {
                            return;
                        }
                        var img = new Image();
                        img.onload = img.onerror = function() {
                            count++;
                            if (i < len - 1) {
                                i++;
                                loadimg();
                                fn && fn(i / (len - 1), img.src);
                            } else {
                                fnEnd && fnEnd(img.src);
                            }
                        };
                        img.src = arr[i];
                    }
                    loadimg();
                },
                bindEvent(){
                    
                    var $ = this.$;
                    $('#loading').ontouchstart = function(e){
                        e.preventDefault();
                    }
                    var mask = $('#zmiti-mask');
                    mask.ontouchstart = function(){
                        this.style.display = 'none';
                    }

                    $("#zmiti-share").ontouchend = function(){
                        mask.style.display = 'block'
                    };

                    $("#zmiti-submit-input").ontouchstart = function(e){
                        //
                        if(e.target.nodeName === 'TEXTAREA'){
                            return
                        }
                        e.preventDefault();
                    };
                    var u = navigator.userAgent;
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; 
                    /*this.$$(".zmiti-swiper-bottom").forEach(function(item){
                        item.style.fontSize = isAndroid ? '14px':'22px';
                    });*/
                    $("#zmiti-back-btn").ontouchend = function(){
                        $("#zmiti-submit-input").classList.remove("active");
                    };
                    this.$("#zmiti-input-enable").ontouchend = function(){
                        //$(".zmiti-msg-input").classList.add('active');
                        $("#zmiti-submit-input").classList.add("active");
                        
                        setTimeout(function(){
                            $("#submit-msg").focus(); 
                        },10)
                       
                    };
                   
                    var d = new Date();
                    var s = this;
                    $("#zmiti-submit-btn").ontouchend = function(){
                        var val = $("#submit-msg").value;
                        var img = $("#zmiti-result>img");
                        img.classList.remove("error");
                        if(!val){
                            img.src = './assets/images/error1.png';
                            img.classList.add('error');
                            $('#zmiti-result>div').innerHTML = '留言内容不能为空';
                            $('#zmiti-result').classList.add('active');
                            setTimeout(() => {
                                $('#zmiti-result').classList.remove('active');
                            }, 2000);
                            return;
                        }
                         axios.post(s.host + '/xhs-security-activity/activity/comment/saveComment', {
                             "secretKey": s.secretKey, // 请求秘钥
                             comment:val,
                             submit:d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(),
                             "nm": "image40" // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
                         }).then(function (data) {
                             var dt = data.data;
                             if(typeof dt === 'string'){
                                 dt = JSON.parse(dt);
                             }
                             if(dt.rc === 0){
                                $('#zmiti-result>img').src = './assets/images/right1.png';
                                $('#zmiti-result>div').innerHTML = '提交成功';
                                setTimeout(function(){
                                    $("#zmiti-result").classList.add("active");
                                }, 100);
                                

                             }
                             else{
                                 $('#zmiti-result>img').src = './assets/images/error1.png';
                                 $('#zmiti-result>div').innerHTML = '提交失败';
                                 setTimeout(function() {
                                     $("#zmiti-result").classList.add("active");
                                 }, 100);
                             }

                             setTimeout(() => {
                                 $("#zmiti-submit-input").classList.remove("active");
                                $(".zmiti-msg-input").classList.remove('active');
                                $('#zmiti-result').classList.remove('active');
                                $("#submit-msg").value = "";
                             }, 2000);
                         });
                    };
                },
                $:function(selector){
                    return document.querySelector(selector);
                },
                imgList:[
                    {
                        title:'从“两轮”到“四轮”',
                        imgs:[
                            './assets/images/2-3.jpg',
                            './assets/images/1-3.jpg',
                        ],
                        desc: '1979年，山东济南，28岁的李伏英用自行车推着刚满一岁的儿子张侃出行（张侃提供）。<br/>2018 年， 张侃用私家汽车接送母亲李伏英（新华社记者朱峥摄）。'
                    },
                     {
                        title:'土坯房变成小洋楼',
                        imgs:[
                            './assets/images/4-3.jpg',
                            './assets/images/3-3.jpg',
                        ],
                        desc: '1996年，浙江安吉，外婆徐苗香抱着11个月的蓝晴霞在土坯房里（蓝晴霞提供）。<br/>2018 年， 蓝晴霞和外婆在土坯房改造的自家小洋楼民宿外（新华社记者黄宗治摄）。'
                    },
                    {
                        title:'打拳的还是我',
                        imgs:[
                            './assets/images/6-3.jpg',
                            './assets/images/5-3-1.jpg',
                        ],
                        desc: '2002年，河南兰考，6岁的李傲星在老式青砖房前打拳（李傲星提供）。<br/>2018 年， 李傲星在150平方米的大房子前打拳（新华社记者冯大鹏摄）。'
                    },
                    {
                        title:'我当上了警察',
                        imgs:[
                            './assets/images/8-3.jpg',
                            './assets/images/7-3.jpg',
                        ],
                        desc: '1985年，山东菏泽，6岁的周鹏在老家习武（周鹏提供）。<br/>2018 年， 中国人民公安大学老师周鹏在北京家中展示篮球（新华社记者殷刚摄）。'
                    },
                    {
                        title:'小岗村的变化',
                        imgs:[
                            './assets/images/10-3.jpg',
                            './assets/images/9-3.jpg',
                        ],
                        desc: '1982年，安徽省凤阳县小岗村，“大包干”带头人之一严宏昌在茅草房前（资料照片）。<br/>2018 年， 严宏昌和家庭成员在自家房屋前合影（新华社记者刘军喜摄）。'
                    },
                    {
                        title:'还是我们哥四个',
                        imgs:[
                            './assets/images/12-3.jpg',
                            './assets/images/11-3.jpg',
                        ],
                        desc: '1994年，西藏阿里，24岁的强巴（右二）和兄弟在“东风”牌运输车前合影（强巴提供）。<br/>2018 年， 西藏山南， 强巴（右二） 和兄弟在私家车前合影（新华社记者普布扎西摄）。'
                    },{
                        title:'大兴安岭的姐弟俩',
                        imgs:[
                            './assets/images/14-3.jpg',
                            './assets/images/13-3.jpg',
                        ],
                        desc: '1985年，黑龙江大兴安岭地区，8岁的崔波和弟弟合影（崔波提供）。<br/>2018 年， 崔波和弟弟在居住的高层小区合影（新华社记者王凯摄）。'
                    },{
                        title:'小美女长大了',
                        imgs:[
                            './assets/images/16-3.jpg',
                            './assets/images/15-3.jpg',
                        ],
                        desc: '1994年，安徽合肥，6岁的周爱际在水泥预制板拼接成的“大板楼”家里（周爱际提供）。<br/>2018 年， 周爱际在160平方米大房子里（新华社记者刘军喜摄）。'
                    },{
                        title:'小丫的家',
                        imgs:[
                            './assets/images/18-3.jpg',
                            './assets/images/17-3.jpg',
                        ],
                        desc: '1991年，河南开封，6岁的柏扬在家中，家中彩电24英寸（柏扬提供）。<br/>2018 年， 柏扬和儿子在北京家中， 家中彩电60多英寸（新华社记者罗晓光摄）。'
                    },{
                        title:'告别窑洞进楼房',
                        imgs:[
                            './assets/images/20-3.jpg',
                            './assets/images/19-3.jpg',
                        ],
                        desc: '1997年，山西太原，69岁的薛美香在自家窑洞里切肉（孟春兰摄）。<br/>2018 年， 90 岁的薛美香在自家房子里切水果（新华社记者曹阳摄）。'
                    }
                    ,{
                        title:'新居前面再合影',
                        imgs:[
                            './assets/images/22-3.jpg',
                            './assets/images/21-3.jpg',
                        ],
                        desc: '2005年，甘肃皋兰，61岁的王毓灿和老伴儿魏秀兰在自家土坯房前（王毓灿提供）。<br/>2018 年， 王毓灿和老伴儿在自家砖瓦房前（新华社记者范培珅摄）。'
                    },
                    {
                        title:'看我托腮照',
                        imgs:[
                            './assets/images/24-3.jpg',
                            './assets/images/23-3.jpg',
                        ],
                        desc: '1978年，黑龙江牡丹江，8岁的于林波在30多平方米的老房子画画（于林波提供）。<br/>2018 年， 于林波在新家中的电脑桌旁（新华社记者王建威摄）。'
                    },{
                        title:'“步步高”',
                        imgs:[
                            './assets/images/25-3.jpg',
                            './assets/images/26-3.jpg',
                        ],
                        desc: '1985年，云南寻甸，27岁的王汉明和妻子在家中举行婚礼（新华社记者杨宗友摄）。<br/>2018 年， 王汉明和妻子在200多平方米的家中客厅留影（新华社记者杨宗友摄）。'
                    },{
                        title:'“小黑白”变“大液晶”',
                        imgs:[
                            './assets/images/28-3.jpg',
                            './assets/images/27-3.jpg',
                        ],
                        desc: '1990年，甘肃兰州，26岁的陈玉芳在家里的黑白电视机前拍照（陈玉芳提供）。<br/>2018 年， 陈玉芳家换成了42英寸液晶电视机（新华社记者陈斌摄）。'
                    },{
                        title:'终于有了自己的车',
                        imgs:[
                            './assets/images/30-3.jpg',
                            './assets/images/29-3.jpg',
                        ],
                        desc: '1983年，重庆，4岁的董嘉坐在临时停放的红旗牌小轿车上（董嘉提供）。<br/>2018 年， 董嘉站在自己的私家车旁（新华社记者刘潺摄）。'
                    },{
                        title:'瞧这一家子',
                        imgs:[
                            './assets/images/32-3.jpg',
                            './assets/images/31-3.jpg',
                        ],
                        desc: '1993年，四川攀枝花，刘蕴晗（前右二）在奶奶怀中和家人合影（刘蕴晗提供）。<br/>2018 年， 刘蕴晗（后右三） 和家人在改造后的老家门前合影（新华社记者江宏景摄）。'
                    },{
                        title:'从火墙到地暖',
                        imgs:[
                            './assets/images/34-3.jpg',
                            './assets/images/33-3.jpg',
                        ],
                        desc: '1981年，大兴安岭加格达奇区，7岁周宁的身后是东北传统平房的火墙（周宁提供）。<br/>2018 年， 周宁在自家屋内看书。 现在是地热供暖（新华社记者王凯摄）。'
                    },{
                        title:'同样的房间，不同的风景',
                        imgs:[
                            './assets/images/36-3.jpg',
                            './assets/images/35-3.jpg',
                        ],
                        desc: '1994年，北京，26岁的郑虹在家中的客厅里（郑虹提供）。<br/>2018 年， 从事画册编辑设计工作的郑虹把之前的客厅改成了自己的书房（新华社记者邢广利摄）。'
                    },{
                        title:'还是姐妹俩一起做饭',
                        imgs:[
                            './assets/images/38-3.jpg',
                            './assets/images/37-3.jpg',
                        ],
                        desc: '1986年，江苏宿迁，8岁的翟红娟（左）和姐姐刷碗揉面（翟红娟提供）。<br/>2018 年， 翟红娟（左） 和姐姐在家里准备午饭（新华社记者李博摄）。'
                    },{
                        title:'姐俩相聚在餐桌',
                        imgs:[
                            './assets/images/40-3.jpg',
                            './assets/images/39-3.jpg',
                        ],
                        desc: '1991年，江西南昌，4岁的卢婧（右）和表妹在家吃东西（卢婧提供）。<br/>2018 年， 卢婧（右）和表妹在宽敞的房子里聊天（新华社记者彭昭之摄）。'
                    },{
                        title:'厨房的岁月',
                        imgs:[
                            './assets/images/42-3.jpg',
                            './assets/images/41-3.jpg',
                        ],
                        desc: '1999年，广东东莞，9岁的唐诗言在家里洗碗。房子是爸爸单位分配的（唐寿新摄）。<br/>2018 年， 唐诗言在她父母购买的住房里洗碗（新华社记者刘大伟摄）。'
                    },{
                        title:'脱贫记',
                        imgs:[
                            './assets/images/44-3.jpg',
                            './assets/images/43-3.jpg',
                        ],
                        desc: '2005年，海南白沙县，28岁的符文京和家人在自家的茅草房前（新华社记者姜恩宇摄）。<br/>2018 年， 符文京坐在自家的砖瓦房前（新华社记者杨冠宇摄）。'
                    },{
                        title:'纸质书变身电子书',
                        imgs:[
                            './assets/images/46-3.jpg',
                            './assets/images/45-3.jpg',
                        ],
                        desc: '1993年，江西南昌，8岁的彭菁在家中看书（彭菁提供）。<br/>2018 年， 彭菁在家中看电子书（新华社记者万象摄）。'
                    },{
                        title:'金婚50载',
                        imgs:[
                            './assets/images/47-3.jpg',
                            './assets/images/48-3.jpg',
                        ],
                        desc: '1992年，湖南长沙，50岁的钱正华和44岁的杨家梅在单位宿舍房（钱正华提供）。<br/>2018 年， 迎来金婚纪念的钱正华和杨家梅在200平方米的家中（新华社记者李尕摄）。'
                    },{
                        title:'终于有了独享空间',
                        imgs:[
                            './assets/images/50-3.jpg',
                            './assets/images/49-3.jpg',
                        ],
                        desc: '1982年，黑龙江哈尔滨，13岁的孙广治（倒数第二排左一）与兄弟姐妹在家中（孙广治提供）。<br/>2018 年， 孙广治在家中宽敞的书房里（新华社记者王凯摄）。'
                    },{
                        title:'基诺乡巨变',
                        imgs:[
                            './assets/images/52-3.jpg',
                            './assets/images/51-3.jpg',
                        ],
                        desc: '1984年，云南西双版纳，20岁的基诺族姑娘腰则（左二）和家人及朋友在简陋住房里（腰则提供）。<br/>2018 年， 腰则（左一） 和家人在设备齐全的新家里（新华社记者蔺以光摄）。'
                    },{
                        title:'进城啦！',
                        imgs:[
                            './assets/images/54-3.jpg',
                            './assets/images/53-3.jpg',
                        ],
                        desc: '在内蒙古四子王旗，20多岁的都贵玛（中）和女儿查干朝鲁（左）在蒙古包前（都贵玛提供）。 <br/>2018 年， 76 岁的都贵玛（右） 和查干朝鲁在自家楼下（新华社记者邹予摄）。'
                    },{
                        title:'画出美好新生活',
                        imgs:[
                            './assets/images/55-3.jpg',
                            './assets/images/56-3.jpg',
                        ],
                        desc: '1990年，江苏南京，56岁的邱平在家中（邱宁提供）。<br/>2018 年， 离休教师邱平在带电梯的110平方米的小高层住宅中画画（新华社记者季春鹏摄）。'
                    },{
                        title:'外婆和妈妈，妈妈和我',
                        imgs:[
                            './assets/images/57-3.jpg',
                            './assets/images/58-3.jpg',
                        ],
                        desc: '1990年，山西太原，5岁的张斯（右）和妈妈要平智在家中（张斯提供）。<br/>2018 年， 张斯（左） 和5岁的女儿韩斯旸在家中（新华社记者詹彦摄）。'
                    },{
                        title:'电话的故事',
                        imgs:[
                            './assets/images/60-3.jpg',
                            './assets/images/59-3.jpg',
                        ],
                        desc: '1978年，陕西临潼，蒋逸芬在家里。因工作需要，家里安装了铁路系统内部电话（蒋逸芬提供）。<br/>2018 年， 陕西西安， 蒋逸芬在160多平方米的家中（新华社记者刘潇摄）。'
                    },{
                        title:'茶乡好兄弟',
                        imgs:[
                            './assets/images/62-3.jpg',
                            './assets/images/61-3.jpg',
                        ],
                        desc: '1980年，福建武夷山，7岁的黄圣辉（左）和弟弟在自家老房子前（黄圣辉提供）。<br/>2018 年， 茶农黄圣辉（左） 和弟弟拿着幼时的照片在自家院子前（新华社记者张国俊摄）。'
                    },{
                        title:'别了，老房子',
                        imgs:[
                            './assets/images/64-3.jpg',
                            './assets/images/63-3.jpg',
                        ],
                        desc: '1988年，内蒙古库伦旗，5岁的闫文丽在自家的老房子前（闫文丽提供）。<br/>2018 年， 闫文丽在自家经营的酒店中整理衣物（新华社记者刘磊摄）。'
                    },{
                        title:'洪湖里长大，洪湖外安家',
                        imgs:[
                            './assets/images/66-3.jpg',
                            './assets/images/65-3.jpg',
                        ],
                        desc: '湖北洪湖，养殖围网拆除前王贵宝一家的住所（王贵宝提供）。<br/>2018 年， 41 岁的王贵宝（右） 与父母在新家（新华社记者熊琦摄）。'
                    },{
                        title:'旧砖房变独栋',
                        imgs:[
                            './assets/images/67-3.jpg',
                            './assets/images/68-3.jpg',
                        ],
                        desc: '1978年，云南寻甸，24岁的杨彩珍（右）在居住的砖房前织毛衣（杨彩珍提供）。<br/>2018 年， 云南曲靖， 杨彩珍在自家200多平方米的独栋住宅前（新华社记者杨宗友摄）。'
                    },{
                        title:'那年的婚房',
                        imgs:[
                            './assets/images/70-3.jpg',
                            './assets/images/69-3.jpg',
                        ],
                        desc: '1992年，安徽合肥，35岁的卫世平（后右）和家人在新婚的弟弟家中（卫世平提供）。<br/>2018 年， 卫世平（前右） 和家人在新家中（新华社记者张端摄）。'
                    },{
                        title:'从危房到新房',
                        imgs:[
                            './assets/images/72-3.jpg',
                            './assets/images/71-3.jpg',
                        ],
                        desc: '1992年，辽宁抚顺，40岁的陈玉芳（左二）一家在采煤沉陷区老房子中（陈玉芳提供）。<br/>2018 年， 陈玉芳（右二） 一家在90多平方米的新房中（新华社记者杨青摄）。'
                    },{
                        title:'深圳一家人',
                        imgs:[
                            './assets/images/74-3.jpg',
                            './assets/images/73-3.jpg',
                        ],
                        desc: '1988年，广东深圳，12岁的欧阳韵倩（左）和家人在父亲单位分配的房子里（欧阳韵倩提供）。 <br/>2018 年， 欧阳韵倩（左三） 和家人在自己购买的商品房里（新华社记者毛思倩摄）。'
                    },{
                        title:'归国来创业',
                        imgs:[
                            './assets/images/76-3.jpg',
                            './assets/images/75-3.jpg',
                        ],
                        desc: '1981年，广西桂平，百天的刘瑜和父母合影（刘瑜提供）。<br/>2018 年， 上海， 留法归来的刘瑜和丈夫尼古拉在自己经营的餐厅里忙碌（新华社记者方喆摄）'
                    },{
                        title:'吾家有女初长成',
                        imgs:[
                            './assets/images/78-3.jpg',
                            './assets/images/77-3.jpg',
                        ],
                        desc: '1993年，黑龙江哈尔滨，4岁的吴濯蓥在30平方米的家中（吴濯蓥提供）。<br/>2018 年， 吴濯蓥在自己90平方米的新家里（新华社记者王凯摄）。'
                    },{
                        title:'苗家婚宴的变迁',
                        imgs:[
                            './assets/images/80-3.jpg',
                            './assets/images/79-3.jpg',
                        ],
                        desc: '2008年，广西那坡县，村民在一户苗族青年家参加婚宴，婚宴非常简陋（新华社记者张爱林摄）。<br/>2018 年， 村民婚宴上的菜品已变得十分丰盛（新华社记者张爱林摄）。'
                    }
                ],
                $$:function(selector){
                    return document.querySelectorAll(selector);
                },
                secretKey: "e9469538b0623783f38c585821459454",
                host: "https://xlive.xinhuaapp.com", //测试域名：https://testxlive.xinhuaapp.com
                layout:function(){
                    var faceImgs = '';
                    for(var i=1;i<=15;i++){
                        faceImgs +="<div class='zmiti-face'><img draggable='false' src='./assets/images/"+i+".gif'/></div>"
                    }
                    var html = '<div class="zmiti-title">轻轻地滑动手指，你将看到40个中国普通百姓家庭的新旧影像。它们如吉光片羽，沉淀着岁月的记忆，承载着美好生活的梦想；它们如跃动的光谱，浓缩了沧海巨变，折射出改革开放创造的中国奇迹。</div>';
                    this.imgList.forEach(function(img,i){
                        if(img.title){
                            html+="<div class='zmiti-team zmiti-swpier-item'>\
                                        <h3 class='zmiti-header'>"+(i+1)+"、"+img.title+"</h3>\
                                        <div class='zmiti-img-box'>\
                                            <img draggable='false' src='"+img.imgs[0]+"' class='zmiti-img' />\
                                            <img draggable='false' src='"+img.imgs[1]+"' class='zmiti-img' />\
                                            <canvas width='750'></canvas>\
                                            <div class='zmiti-swipe-bar'></div>\
                                        </div>\
                                        <div class='zmiti-swiper-bottom'>\
                                            <span>"+img.desc+"</span>\
                                        </div>\
                                        <div class='zmiti-like'>\
                                            <img draggable='false' src='./assets/images/like1.png'/>\
                                            <span class='zmiti-img-like-num'>0</span>\
                                            "+ faceImgs+"\
                                        </div>\
                                    </div>"
                        }
                    })

                    /*
                        总监制：刘思扬
                        监  制：孙承斌
                        策  划：刘洁 陈凯星 郑卫 马书平
                        统  筹：王建华 齐慧杰
                        图片编辑：薛东梅 林繁晶 孟晨光
                        新媒体编辑：宋君毅 唐颢宸 孟洁
                        侯帮兴 刘雅萱 卓越 
                        设计制作：麟腾传媒
                        技术支持：新华社新媒体中心智能化编辑部
                         
                        新华社摄影部 新华社新媒体中心
                        联合出品
                    */

                    html+='<div class="zmiti-team">\
                            <div>\
                                <div>总监制：</div>\
                                <div><span>刘思扬</span></div>\
                            </div>\
                            <div>\
                                <div>监<label style="opacity:0">监</label>制：</div>\
                                <div><span>孙承斌</span></div>\
                            </div>\
                            <div>\
                                <div>策<label style="opacity:0">监</label>划：</div>\
                                <div><span>刘洁</span><span>陈凯星</span><span>郑卫</span><span>马书平</span></div>\
                            </div>\
                            <div>\
                                <div>统<label style="opacity:0">监</label>筹：</div>\
                                <div><span>王建华</span><span>齐慧杰</span></div>\
                            </div>\
                            <div>\
                                <div>图片编辑：</div>\
                                <div><span>薛东梅</span><span>林繁晶</span><span>孟晨光</span></div>\
                            </div>\
                            <div>\
                                <div>新媒体编辑：</div>\
                                <div><span>宋君毅</span><span>唐颢宸</span><span>孟洁</span><span>侯帮兴</span><span>刘雅萱</span><span>卓越</span></div>\
                            </div>\
                            <div>\
                                <div>视觉设计：</div>\
                                <div><span>王益亮</span></div>\
                            </div>\
                            <div>\
                                <div>设计制作：</div>\
                                <div><span>麟腾传媒</span></div>\
                            </div>\
                            <div>\
                                <div>技术支持：</div>\
                                <div><span>新华社新媒体中心智能化编辑部</span></div>\
                            </div>\
                            <div class="zmiti-spilt">\
                                <div><span>新华社摄影部</span><span>新华社新媒体中心</span><span>联合出品</span></div>\
                            </div>\
                    </div>'
                   
                    var s = this;
                    var $$ = s.$$;
                    this.$('.zmiti-main-ui').innerHTML = html;

                    var otherhtml = "\
                     <div class='zmiti-msg-input'>\
                        <div>\
                            <div class='zmiti-input-enable' id='zmiti-input-enable'>\
                                <img src='./assets/images/edit.png'/>  写留言...\
                            </div>\
                            <div class='zmiti-discuss'>\
                                <img src='./assets/images/msg.png'/>\
                            </div>\
                            <div class='zmiti-share' id='zmiti-share'>\
                                <img src='./assets/images/share.png'/>\
                            </div>\
                        </div>\
                    </div>\
                    <div class='zmiti-submit-input' id='zmiti-submit-input'>\
                        <div style='line-height:90px;height:60px;;text-align:left;margin-left:5%'>请输入您的留言</div>\
                    <textarea id='submit-msg'></textarea>\
                        <div class='zmiti-submit-btn' id='zmiti-submit-btn'>\
                            提交\
                        </div>\
                        <div class='zmiti-submit-btn' id='zmiti-back-btn' style='margin:30px 1% 50px'>\
                            返回\
                        </div>\
                    </div>\
                    <div class='zmiti-mask' id='zmiti-mask'>\
                        <img src='./assets/images/arrow.png' />\
                    </div>\
                    <div class='zmiti-result ' id='zmiti-result'>\
                        <img src='./assets/images/error1.png' />\
                        <div></div>\
                    </div>";
                    document.body.innerHTML+= otherhtml;
                    var likes = this.$$('.zmiti-like');
                    likes.forEach(function(like,k){
                        var faces = like.querySelectorAll('.zmiti-face');
                        var facesAry = [];
                        faces.forEach(function (face, i) {
                            facesAry.push(new Face({
                                obj:face
                            }));
                        });
                        t = null;
                       
                        like.index = k;
                        like.addEventListener('touchend',function(){
                            if(t === null){
                                t =  setInterval(function () {
                                    facesAry.forEach(function (face) {
                                        face.animate();
                                    })
                                }, 30);
                                
                                s.like(this.index,like);
                               
                            }
                            setTimeout(function() {
                                clearInterval(t);
                                t = null;
                                facesAry.forEach(function(face) {
                                    face.init();
                                });
                            }, 1000);
                        });
                    })
                },
                like: function(index) {
                    var s = this;
                    var $$ = this.$$;
                    axios.post(s.host + '/xhs-security-activity/activity/num/updateNum', {
                        "secretKey": s.secretKey, // 请求秘钥
                        "nm": "xhs-image40-like-" + (index + 1) // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
                    }).then(function(data) {
                        var dt = data.data;
                        if (typeof dt === 'string') {
                            dt = JSON.parse(dt);
                        }
                        if (dt.rc === 0) {
                            var numObj = $$(".zmiti-swpier-item")[index].querySelector('.zmiti-img-like-num');
                            numObj.innerHTML = numObj.innerHTML * 1 + 1;
                        }
                    });
                    
                },
                getPV:function(id){
                    var s = this;
                    var $$ = this.$$;
                    axios.post(this.host +'/xhs-security-activity/activity/num/getNum',{
                        "secretKey": s.secretKey,  // 请求秘钥
                        "nm": "xhs-image40-like-"+id // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
                    }).then(function(data){
                        var dt = data.data;
                        if(typeof dt === 'string'){
                            dt = JSON.parse(dt);
                        }
                        $$(".zmiti-swpier-item")[id - 1].querySelector('.zmiti-img-like-num').innerHTML = dt.data.num;
                    });
                },
                init:function(){
                    
                    var imgList = [
                        './assets/images/right1.png',
                        './assets/images/error1.png',
                        './assets/images/edit.png',
                    ];
                    var s = this;
                    this.imgList.forEach(function(img,i){
                        imgList = imgList.concat(img.imgs);
                    });

                    var pro = s.$('#progress');
                    this.loading(imgList,function(e){
                       pro.innerHTML = (e*100|0)+"%";
                    },function(){

                       setTimeout(function(){
                            s.$('#loading').style.display = 'none';
                       },110)

                       s.layout();
                       s.setSize();
                       s.bindEvent();
                       
                       s.imgList.forEach(function(img, i) {
                           s.getPV(i + 1);
                       });
                       
                    })
                },
                initCanvas:function(){
                    var self = this;
                    this.canvases.forEach(function(item,i){
                   ///var {canvas,imgs,box,offsetLeft} = item;
                    var canvas = item.canvas,
                        box = item.box,
                        imgs = item.imgs,
                        offsetLeft = item.offsetLeft;
                        var context = canvas.getContext('2d');
                        var img = new Image();
                        var s = 0.5;
                        img.onload = function(){
                            var scale = this.width / canvas.width;
                            context.drawImage(imgs[0],0,0,canvas.width,canvas.height);
                            setTimeout(function(){
                                context.drawImage(imgs[1],0,0,canvas.width*scale*s,canvas.height*scale,0,0,canvas.width*s,canvas.height);
                            },100)
                            var bar = box.querySelector('.zmiti-swipe-bar');
                            var doc = document;
                            function start(e){

                                var heart = doc.createElement('img');
                                heart.src = './assets/images/heart.png';
                                heart.className='zmiti-heart';

                                heart.addEventListener('animationend',function(){
                                    box.removeChild(this);
                                });

                                var node = e.target.parentNode.parentNode;
                                var index = -1;
                                self.$$(".zmiti-main-ui>.zmiti-swpier-item").forEach(function(item,i){
                                    if(item === node){
                                        index = i;
                                    }
                                });

                               
                                self.like(index);
                                
                                box.appendChild(heart);
                                heart.style.left = (e.changedTouches[0].pageX / 750)*100 + '%';
                                heart.style.top = e.changedTouches[0].pageY - box.offsetTop + 'px';
                                
                                //e.preventDefault();
                                document.ontouchmove = function(e){
                                    e.preventDefault();
                                    var pageX = e.changedTouches[0].pageX;
                                    s = (pageX - offsetLeft) / canvas.width;
                                    context.clearRect(0,0,canvas.width,canvas.height);
                                    context.drawImage(imgs[0],0,0,canvas.width,canvas.height);
                                    
                                    context.drawImage(imgs[1],0,0,canvas.width*scale*s,canvas.height*scale,0,0,canvas.width*s,canvas.height);
                                    bar.style.left = Math.min(Math.max(s*100,0),99)+'%';
                                    return false;
                                }
                                document.ontouchend = function(e){
                                    e.preventDefault();
                                    document.ontouchmove = null;
                                    document.ontouchend = null;
                                    var ss = s;
                                    setTimeout(function(){
                                        var t = setInterval(function(){
                                            if(s>.5){
                                                s-=.04;
                                            }
                                            else{
                                                s+=.04;                                           
                                            }
                                             if(Math.abs(s -.5)<=.08){
                                                s = .5;
                                                clearInterval(t);
                                            }

                                            context.clearRect(0,0,canvas.width,canvas.height);
                                            context.drawImage(imgs[0],0,0,canvas.width,canvas.height);
                                            
                                            context.drawImage(imgs[1],0,0,canvas.width*scale*s,canvas.height*scale,0,0,canvas.width*s,canvas.height);
                                            bar.style.left = Math.min(Math.max(s*100,0),99)+'%';


                                        },20);
                                    },100)

 
                                }
                            }
                            
                            box.ontouchstart = function(e){
                                start(e);
                               // return false;
                            }
                        }
                        img.src = imgs[0].src;
                     });
                },
               
                setSize:function(){
                    var $$ = this.$$;
                    this.canvases = [];
                    var self = this;
                    setTimeout(function(){
                        for(var i = 0;i<$$('.zmiti-img-box').length;i++){
                            var box = $$('.zmiti-img-box')[i];
                            var offsetLeft = box.offsetLeft;
                            var imgs = box.querySelectorAll('.zmiti-img');
                            var canvas = box.querySelector('canvas');
                                canvas.height = box.clientHeight;
                                canvas.width = box.clientWidth;
                                self.canvases.push({canvas,imgs,box,offsetLeft});
                                self.initCanvas();
                        };
                    },100)
                },
            };

            util.init();

        }();