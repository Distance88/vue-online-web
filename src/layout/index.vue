<template>
    <div>
        <nav-bar></nav-bar>
        <app-main></app-main>
    </div>
</template>

<script>

import navBar from './components/NavBar'
import AppMain from './components/AppMain'

export default {
    components:{
        navBar,
        AppMain
    }
}
</script>