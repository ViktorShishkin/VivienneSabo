import {resolve, join} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const devMode = process.env.NODE_ENV !== 'production'

export default {
  target: devMode ? 'web' : 'browserslist',
  entry: {
    main: './src/js/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },
  resolve: {
    alias: {
      '@img': resolve(__dirname, 'src/img/'),
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
        }
      }
    }
  },
  devServer: {
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src/pages/index.pug'),
      filename: 'index.html',
      inject: 'body',
      minify: false,
      templateParameters(compilation, assets, options) {
        return {
          renderIcon: (name, className = '') => {
            const sprite = compilation.options.plugins.filter(item => item.hasOwnProperty('spritemapCache'))[0];
            
            const re = new RegExp(`id="sprite-${name}" viewBox="([^"]+)"`);
            const viewBox = sprite.spritemapCache.match(re);

            return `<svg class="icon ${className}" viewBox="${viewBox[1]}"><use xlink:href="assets/sprite.svg#sprite-${name}"></use></svg>`;
          }
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: `style.css`
    }),
    new SVGSpritemapPlugin('./src/sprite/*.svg', {
      output: {
        filename: 'assets/sprite.svg',
        svg: {
          sizes: false
        }
      },
      sprite: {
        generate: {
          use: true,
          view: '-fragment',
          symbol: true
        },
      },
      styles: {
        filename: 'sprites.scss',
        format: 'fragment',
        filename: './node_modules/svg-spritemap-webpack-plugin/sprites.scss'
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, 'src') + '/static',
          to: resolve(__dirname, 'dist/assets')
        }
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug3-loader',
          options: {
            pretty: true
          }
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import '~svg-spritemap-webpack-plugin/sprites';
              `
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(mp4|ogg|webm)$/,
        type: 'asset/resource'
      }
    ],
  }
}
