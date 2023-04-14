<script setup lang="ts">
    import BaseLayout from "../layouts/BaseLayout.astro";
    import BlogPost from "../components/BlogPost.astro";
    const pageTitle = "我的学习笔记";
    const allPosts = await Astro.glob("../pages/posts/*.md");
    import { ref, reactive } from "vue";
</script>
<template>
    <div class="">
        <BaseLayout pageTitle="{pageTitle}">
            <p>HTML</p>
            <ul
                v-for="post in allPosts"
                :key=""
            >
                <li></li>
            </ul>
        </BaseLayout>
    </div>
</template>

<style scope lang="less"></style>

--- ---
