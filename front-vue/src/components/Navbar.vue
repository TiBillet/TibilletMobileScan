<template>
  <div class="container-fluid m-0 p-0">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img :src="logo" alt="TiBillet" class="logo-reload"/>
        </a>
        <div class="text-wrap text-white">Titre</div>
        <!-- menu -->
        <i class="fa fa-bars text-white icon-menu-burger" aria-hidden="true" href="#" @click.stop="iniMenuPs()"
           id="navbarDropdownMenuLink"
           role="button" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
          <li><a class="dropdown-item dropdown-toggle dropdown-item-no-ps" @click.stop="showPs()">POINTS DE VENTES</a>
          </li>
          <li v-for="itemMenu in menuPs" :key="itemMenu.id"><a class="dropdown-item dropdown-item-ps"
                                                               @click="setCurrentPsAndGo(itemMenu.id)">{{
              itemMenu.name.toUpperCase()
            }}</a></li>
          <li><a class="dropdown-item dropdown-item-no-ps">PREPARATIONS</a></li>
          <li><a class="dropdown-item dropdown-item-no-ps">TABLES</a></li>
          <li><a class="dropdown-item dropdown-item-no-ps">MODE GERANT.E</a></li>
          <li><a class="dropdown-item dropdown-item-no-ps">REDEMARRER</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'

import logo from '@/assets/images/logo-288x288.png'



function iniMenuPs() {
  let items = document.querySelectorAll('.dropdown-item-no-ps')
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('hide-ps')
  }
  items = document.querySelectorAll('.dropdown-item-ps')
  for (let i = 0; i < items.length; i++) {
    items[i].classList.add('hide-ps')
  }
}

function showPs() {
  const items = document.querySelectorAll('.dropdown-item')
  for (let i = 0; i < items.length; i++) {
    items[i].classList.toggle('hide-ps')
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
}

.logo-reload {
  width: auto;
  height: 46px;
}

.icon-menu-burger {
  font-size: 2rem;
}

.dropdown-menu-end {
  background-color: #212529 !important;
}

.dropdown-menu-end .dropdown-item {
  color: white;
}

.dropdown-menu-end .dropdown-item:hover {
  color: #212529;
}

.hide-ps {
  display: none;
}

.dropdown-item {
  cursor: pointer;
}
</style>