const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	//entry:  __dirname + "/src/js/index.js",//唯一入口文件,值可以是数组
	entry:{
		index:__dirname + "/src/js/index.js"
	},
	//多入口建议使用对象格式
	output: {
		path: __dirname + "/public",
		//打包后的文件存放的路径
		filename:"js/[name]-[hash].js"
		//打包后输出文件的name
		//xxx-[hash].xx是哈希值,一段随机字符串
		//[name]可以自动独打包对象中的每一个文件
	},
	devServer:{
		contentBase:"./pablic",
		inline:true
	},
	module: {
		rules: [
		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: [{
					loader: "css-loader",
					options: {
						//通常modules参数还要通过localIdentName的配合来设置css的类名。没有设置localIdentName的css编译后是一串随机字符串，可读性很差，因此还需要对它的类名进行处理,(暂时先关闭)
						modules: false
					}
				}],
				publicPath:"../"
			})
		},
		{
			test: /\.(png|jpg|gif|jpeg)$/,
			use: [{
				loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]'
			}]
		},
		{
			test: /\.html$/,
			loader: 'html-withimg-loader'
		 },
		{
			test: /\.(woff|woff2|svg|eot|xttf|ttf)\??.*$/,
			use: [
			{
				loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
			}
			]
		}
	]
	},
	plugins:[
		new ExtractTextPlugin("./css/[name].css"),
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			filename:'./index.html',
			chunks:['index'],
			hash:true,
			minify:{
				removeAttributeQuotes: true, // 移除属性的引号
				caseSensitive: false, //是否大小写敏感
				removeComments:true, // 去除注释
				removeEmptyAttributes:true, // 去除空属性
				collapseWhitespace: true //是否去除空格
			}
		})
	]
}

