<template>
  <div class="my-container">
    <div class="ui container">
      <div class="ui three column grid">
        <router-link to="/exam">
          <div class="ui link cards column">
            <div class="card">
              <div class="content">
                <div class="ui huge horizontal list">
                  <div class="item">
                    <img
                      class="ui avatar image"
                      src="../../static/images/joe.jpg"
                    />
                    <div class="content">
                      <div class="header">Java</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extra content" style="background-color:#FAFAFA">
                <div
                  class="ui small horizontal divided list"
                  style="margin-left:45px"
                >
                  <div class="item">
                    <div class="content">
                      <div class="header">满分：100分</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="content">
                      <div class="header">时间：120分钟</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
        <router-link to="/exam">
          <div class="ui link cards column">
            <div class="card">
              <div class="content">
                <div class="ui huge horizontal list">
                  <div class="item">
                    <img
                      class="ui avatar image"
                      src="../../static/images/kristy.png"
                    />
                    <div class="content">
                      <div class="header">C++</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extra content" style="background-color:#FAFAFA">
                <div
                  class="ui small horizontal divided list"
                  style="margin-left:45px"
                >
                  <div class="item">
                    <div class="content">
                      <div class="header">满分：100分</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="content">
                      <div class="header">时间：120分钟</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
        <router-link :to="{ name: 'exam', params: {type: 1 } }">
          <div class="ui link cards column">
            <div class="card">
              <div class="content">
                <div class="ui huge horizontal list">
                  <div class="item">
                    <img
                      class="ui avatar image"
                      src="../../static/images/jenny.jpg"
                    />
                    <div class="content">
                      <div class="header">数据结构</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extra content" style="background-color:#FAFAFA">
                <div
                  class="ui small horizontal divided list"
                  style="margin-left:45px"
                >
                  <div class="item">
                    <div class="content">
                      <div class="header">满分：100分</div>
                    </div>
                  </div>
                  <div class="item">
                    <div class="content">
                      <div class="header">时间：120分钟</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.my-container {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
}
.ui.cards {
  margin-top: 0.875em !important;
}
</style>