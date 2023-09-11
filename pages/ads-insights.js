import { useSelector } from 'react-redux';

import ErrorCard from '../components/error-card';
import DashboardChart from '../components/chart';
import DocumentationLink from '../components/documentation-link';
import Section from '../components/section';

import { selectInsights } from '../utils/data-formatting';

import adsInsights from '../constants/ads-insights.json';

import styles from '../styles/style.module.css';

const AdsInsights = () => {
  const adsInsightsData = useSelector(state => state.adsInsights);
  const error = useSelector(state => state.error.adsInsights);
  return <div>
    <DocumentationLink
      description={adsInsights.docs.description}
      link={adsInsights.docs.link}
      linkLabel={adsInsights.docs.linkLabel}/>
    { error
      ? <ErrorCard icon="AiFillWarning" error={error}/>
      : adsInsights.sections.map(section => {
        return <Section title={section.title} key={section.title}>
          { <div className={styles.rowContainer}>
              { section.charts.map(el => {
                  return <DashboardChart
                    key={el.id.toString()}
                    size={el.size}
                    type={el.type}
                    metrics={el.metrics}
                    loading={adsInsightsData.length === 0}
                    insights={selectInsights(el.metrics, adsInsightsData)}
                    title={el.title}
                    description={el.description}
                    labels={el.labels}
                    icons={el.icons}>
                  </DashboardChart>
                })
              }
            </div>
          }
        </Section>
      })
    }
  </div>;
}

export default AdsInsights;
