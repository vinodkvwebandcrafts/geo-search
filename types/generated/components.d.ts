import type { Schema, Struct } from '@strapi/strapi';

export interface CommonButton extends Struct.ComponentSchema {
  collectionName: 'components_common_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    target_blank: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface CommonContentArea extends Struct.ComponentSchema {
  collectionName: 'components_common_content_areas';
  info: {
    displayName: 'Content_area';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    enable_component: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface CommonFollow extends Struct.ComponentSchema {
  collectionName: 'components_common_follows';
  info: {
    displayName: 'Follow';
  };
  attributes: {
    icon: Schema.Attribute.Component<'common.icon', true>;
    title: Schema.Attribute.String;
    use_global: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface CommonIcon extends Struct.ComponentSchema {
  collectionName: 'components_common_icons';
  info: {
    displayName: 'Icon';
  };
  attributes: {
    name: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface CommonIconCard extends Struct.ComponentSchema {
  collectionName: 'components_common_icon_cards';
  info: {
    displayName: 'Icon Card';
    icon: 'monitor';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface CommonImage extends Struct.ComponentSchema {
  collectionName: 'components_common_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    desktop_image: Schema.Attribute.Media<'images'>;
    mobile_image: Schema.Attribute.Media<'images'>;
  };
}

export interface CommonImageCard extends Struct.ComponentSchema {
  collectionName: 'components_common_image_cards';
  info: {
    displayName: 'image card';
    icon: 'globe';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    mobile_image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface CommonRepeatableImage extends Struct.ComponentSchema {
  collectionName: 'components_common_repeatable_images';
  info: {
    displayName: 'Repeatable_image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface CommonRepeatableText extends Struct.ComponentSchema {
  collectionName: 'components_common_repeatable_texts';
  info: {
    displayName: 'Repeatable_Text';
  };
  attributes: {
    title: Schema.Attribute.Text;
  };
}

export interface CommonRepeatableValues extends Struct.ComponentSchema {
  collectionName: 'components_common_repeatable_values';
  info: {
    displayName: 'repeatable_values';
    icon: 'check';
  };
  attributes: {
    value: Schema.Attribute.String;
  };
}

export interface CommonTag extends Struct.ComponentSchema {
  collectionName: 'components_common_tags';
  info: {
    displayName: 'tag';
    icon: 'calendar';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface CommonTitle extends Struct.ComponentSchema {
  collectionName: 'components_common_titles';
  info: {
    displayName: 'title';
    icon: 'priceTag';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface CommonVideo extends Struct.ComponentSchema {
  collectionName: 'components_common_videos';
  info: {
    displayName: 'Video';
  };
  attributes: {
    desktop_poster: Schema.Attribute.Media<'images'>;
    desktop_video: Schema.Attribute.Media<'videos'>;
    mobile_poster: Schema.Attribute.Media<'images'>;
    mobile_video: Schema.Attribute.Media<'videos'>;
    stream_url_desktop: Schema.Attribute.String;
    stream_url_mobile: Schema.Attribute.String;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    socialNetwork: Schema.Attribute.Enumeration<
      ['Facebook', 'Twitter', 'LinkedIn', 'YouTube', 'Instagram', 'Pinterest']
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 254;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 254;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.button': CommonButton;
      'common.content-area': CommonContentArea;
      'common.follow': CommonFollow;
      'common.icon': CommonIcon;
      'common.icon-card': CommonIconCard;
      'common.image': CommonImage;
      'common.image-card': CommonImageCard;
      'common.repeatable-image': CommonRepeatableImage;
      'common.repeatable-text': CommonRepeatableText;
      'common.repeatable-values': CommonRepeatableValues;
      'common.tag': CommonTag;
      'common.title': CommonTitle;
      'common.video': CommonVideo;
      'shared.meta-social': SharedMetaSocial;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
