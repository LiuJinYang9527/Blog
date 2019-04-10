<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>
<script>
  import 'gitalk/dist/gitalk.css'
  import Gitalk from 'gitalk'
  export default {
    name: 'comment',
    data() {
      return {};
    },
    mounted() {
      const gitalk = new Gitalk({
        clientID: 'b380bce6498235f7d891',
        clientSecret: '245e9391c48fb45c0c1923da7c974596cf98b1d2',
        repo: 'Blog',
        owner: 'LiuJinYang9527',
        admin: ['LiuJinYang9527'],
        id: "comment", // Ensure uniqueness and length less than 50
        distractionFreeMode: false // Facebook-like distraction free mode
      })
      gitalk.render('gitalk-container')
    },
  };
</script>
