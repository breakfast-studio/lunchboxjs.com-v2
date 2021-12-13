<template>
    <section class="front-page">
        <!-- Intro -->
        <div class="intro">
            <h1>LunchboxJS</h1>
            <h2>Vue 3 + Three.js custom renderer</h2>
            <ul class="info">
                <li>
                    <a
                        href="//github.com/breakfast-studio/lunchboxjs"
                        target="_blank"
                        >GitHub</a
                    >
                </li>
                <li>
                    <a href="//docs.lunchboxjs.com" target="_blank">Docs</a>
                </li>
                <li>
                    <a
                        href="//github.com/breakfast-studio/lunchboxjs.com"
                        target="_blank"
                        >Source for this site</a
                    >
                </li>
            </ul>
            <h3>
                by
                <a href="//breakfaststudio.co" target="_blank"
                    >Breakfast Studio</a
                >
            </h3>
        </div>
    </section>
</template>

<style lang="scss">
.front-page {
    .intro {
        position: fixed;
        bottom: 10px;
        left: 10px;

        h1 {
            margin: 0;
        }
        h2 {
            margin: 0;
            font-size: 20px;
        }
        h3 {
            margin: 20px 0 0;
            font-size: 14px;
        }
        a {
            color: black;
            padding: 0;

            &:hover,
            &:focus {
                text-decoration: none;
                background: white;
            }
        }
        ul {
            margin: 5px 0 0;
            padding: 0;
            list-style: none;
            display: flex;
            font-size: 18px;

            li:not(:last-child) {
                margin-right: 5px;

                &:after {
                    content: '∙';
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>