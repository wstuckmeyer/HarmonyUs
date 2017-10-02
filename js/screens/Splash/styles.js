const styles = {
	imageContainer: {
    	flex: 1,

    	//alignItems: 'stretch'
  	},
	background: {
		resizeMode: 'cover',
		flex: 1,
		width: null,
		alignItems: 'center',
		justifyContent: 'center',
	},
	h3:{
		backgroundColor: 'rgba(0,0,0,0)'
	},
	logo:{
		resizeMode: 'contain',
		flex: 2,
		width: null,
		width: 300,
		flexDirection: 'row'
	},
	login:{
		marginBottom: 10,
		backgroundColor: '#FE1F6B',
		height: 70

	},
	signup:{
		marginBottom: 15,
		backgroundColor: '#009688',
		height: 70
	},
	buttonTxt:{
		fontSize: 20,
		fontFamily: 'futura',
		lineHeight: null
	}
}
export default styles;