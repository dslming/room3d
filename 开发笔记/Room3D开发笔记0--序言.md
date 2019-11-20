### 序言

#### 1、引子
很多话想说,作为前端开发者,技术瓶颈、生活压力,必须要拓宽新的技术领域,结合自身情况,于是选择了WEBGL。

WEBGL 本质上是`原生`,原生开发方式使用起来总是略显麻烦,为了快速上手开发web3D应用,这里选择Three.js 进行开发。

#### 2、WEBGL应用
>参考:https://manu.ninja/25-real-world-applications-using-webgl/

WEBGL 的应用目前不是很多,大概有以下几个:
- 地图(Cesium),可能需要点地理信息知识,个人对这个不感兴趣
- 商品展示,个人理解就是将3D模型导入就可以了,没有太多拓展
- 网页游戏,Unity3D可以直接编译到WEBGL
- 音乐可视化,娱乐性更强,市场小众
- 数据可视化(echarts)
- 布局规划(Floorplanning),个人觉得广度和和深度很值得探究。

#### 3、项目确定
上面的很多应用里我还是想详细说一下游戏, 游戏开发钟有大量3D知识,目前比较成熟的游戏引擎如Unity3D,很多理念都非常值得WEBGL借鉴和学习,
个人研究了一段时间,准备入坑Unity3D开发,最终还是选择了放弃,主要有以下原因:
- 程序开发比重小, 一款游戏,美工:音乐:程序 = 1:1:1,程序设计比重仅占1/3
- 开源项目少,和纯粹的软件开发相比,游戏的美工和音乐都比较重要且针对性更强,所有很少有优秀的开源游戏

综上所述,WEBGL应用五彩缤纷,但是个人选择`布局规划`,作为WEBGL(Three.js)的最佳实践。

#### 4、布局规划
> 商业应用: 
> https://roomstyler.com/3dplanner
> https://planner5d.com/?prcode=53b8ac
> https://home.by.me/en/
> https://www.roomle.com/en/business/furniture-retail
> http://3d.fuwo.com/sign/signin/?next=http://3d.fuwo.com/aim5d/

> 代码参考:
> https://github.com/furnishup/blueprint3d

这个系列主要就是参考这个代码,然后逐渐完善增加功能。

#### 5、技术栈
源码准备使用Typescript,方便维护扩展。
页面使用React 16.8.6,因为个人对vue比较了解,所以顺便学习React。
因为布局设计移动端太小了,所以不准备兼容。

#### 6、尾巴
项目名称: Room3D
项目描述: 实现3D家庭装修
<img src="https://camo.githubusercontent.com/a1f563a4a3d6ac6405e9761c9857a63236d872c6/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6675726e69736875702f64657369676e2e706e67">
地址: `https://github.com/1097364388/Room3D.git`
作者: DSLMing
<全文结束>






