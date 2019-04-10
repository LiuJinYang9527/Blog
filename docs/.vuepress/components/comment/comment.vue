<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script>
export default {
  name: 'comment',
  data() {
    return {};
  },
  mounted() {
    let body = document.querySelector('.gitalk-container');
    let script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
    body.appendChild(script);
    script.onload = () => {
      const commentConfig = {
        clientID: 'b380bce6498235f7d891',
        clientSecret: '245e9391c48fb45c0c1923da7c974596cf98b1d2',
        repo: 'Blog',
        owner: 'Melon',
        // 这里接受一个数组，可以添加多个管理员
        admin: ['LiuJinYang9527'],
        // id 用于当前页面的唯一标识，一般来讲 pathname 足够了，
       
        // 但是如果你的 pathname 超过 50 个字符，GitHub 将不会成功创建 issue，此情况可以考虑给每个页面生成 hash 值的方法.
        id: location.pathname,
        distractionFreeMode: false,
      };
      const gitalk = new Gitalk(commentConfig);
      gitalk.render('gitalk-container');
    };
  },
};
</script>

作者：YanceyOfficial
链接：https://juejin.im/post/5c9e30fb6fb9a05e1c4cecf6
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。