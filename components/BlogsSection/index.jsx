import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styles from "../../styles/Home.module.css";
import ProjectCard from '../Project';


export default function BlogsSection({data}){
    const blog=data[0].frontMatter
    return (
      <div className={"uk-width-1-1 "+styles.blogs_section}>
          <div className="uk-section uk-dark">
            <div className="uk-container">
              <div className="uk-flex uk-flex-between uk-margin-large-bottom">
                <div className="uk-h1 uk-text-bolder">
                    Blogs
                </div> 
                <div className={styles.view_all}>
                  <button className="uk-button uk-button-link uk-padding-small uk-margin-small-left uk-margin-small-right uk-text-bolder">
                  VIEW ALL
                  </button>
                </div>
              </div>    
              <div className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" data-uk-grid>
                <div className="uk-flex-last@s uk-card-media-right uk-cover-container">
                    <img src={blog.thumbnail} alt="" data-uk-cover/>
                    <canvas width="600" height="300"></canvas>
                </div>
                <div>
                    <div className="uk-card-body">
                        <h3 className="uk-card-title uk-text-bolder">{blog.title}</h3>
                        <p>{blog.description}</p>
                        <Link href={`blogs/${data[0].slug}`}><button className='uk-text-bold uk-button uk-button-link'>Read More <span uk-icon="arrow-right"></span></button></Link>
                        <div className='uk-flex uk-flex-middle uk-margin-top'>
                          <Image src={blog.author_avatar} width={40} height={40} className='uk-border-circle' style={{border:'1px solid #D9D9D9'}}/>
                          <div className='uk-text-bold uk-margin-small-left'>{blog.author}</div>
                        </div>
                    </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>
    )
}