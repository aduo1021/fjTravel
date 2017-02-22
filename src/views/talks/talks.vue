<template>
    <div id="talks">
        <myHeader title="万花筒" backUrk="index" ></myHeader>
        <div class="m-top40">
          <mt-cell title="爱的印记" to="loveMark" is-link></mt-cell>
          <mt-cell title="到此一游" to="messageWall" is-link></mt-cell>
        </div>

        <myFooter></myFooter>
    </div>
</template>

<script>
    import myHeader from 'components/header2';
    import myFooter from 'components/footer';
    export default {
        components: {
          myHeader,
          myFooter
        }
    }
</script>

<style>
</style>
