<template>
	<div>
		<Youtube :youtube="youtube"></Youtube>
	</div>
</template>
<script>
import Youtube from './components/Youtube'
export default {
	data(){
		return {
			"youtube": 'hT_nvWreIhg'
		}
	},
	components: {
		Youtube
	}
}
</script>