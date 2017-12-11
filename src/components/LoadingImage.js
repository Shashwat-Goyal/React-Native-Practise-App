import React from 'react';

import { Image, View, Text, StyleSheet, ActivityIndicator} from 'react-native';

export default class LoadingImage extends React.Component {
	
	constructor(props) {
		super(props);
		this.state= {
			loading: true
		};
	}

	imageLoaded() {
		this.setState({
			loading: false
		});
	}

	render() {
		const {loading} = this.state;
		let { source } = this.props;
		console.log(source)
		return (
			<View style={{flex: 1, alignItems: 'stretch'}}>
				<Image 
					source={source}
					onLoad={() => this.imageLoaded()}
					style={loading ? styles.hidden : styles.wallpaper}
				/>
				{loading ? <ActivityIndicator animating={true} /> : null}
			</View>
			)
	}
}

const styles = StyleSheet.create({
	hidden: {
		width: 0,
		height: 0
	},
	wallpaper: {
		flex: 1,
		width: null,
		height: 300,
	},
});