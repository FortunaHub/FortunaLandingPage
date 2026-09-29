import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { DOC_META } from '../config/docs';

export default function DocsLayout() {
  return <div className="min-h-screen bg-fortuna-dark">
    <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
      <aside aria-label="Documentation navigation" className="shrink-0 border-b border-white/10 bg-[#080808] lg:sticky lg:top-16 lg:max-h-[calc(100vh-4rem)] lg:w-64 lg:self-start lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="p-5 lg:p-6">
          <p className="text-lg font-bold">Documentation</p>
          <p className="mt-2 text-xs leading-6 text-white/60">Install, investigate, and operate Fortuna.</p>
          <nav aria-label="Documentation sections" className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {(['Start here', 'Use Fortuna', 'Operate Fortuna'] as const).map(group => <div key={group}>
              <p className="mb-2 text-xs font-semibold text-white/45">{group}</p>
              <div className="flex flex-col gap-1">{DOC_META.filter(doc => doc.group === group).map(doc => <NavLink key={doc.slug} to={`/docs/${doc.slug}`} className={({ isActive }) => `flex min-h-11 items-center rounded-md px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-fortuna-pink ${isActive ? 'bg-fortuna-pink/15 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white'}`}>{doc.title}</NavLink>)}</div>
            </div>)}
          </nav>
        </div>
      </aside>
      <div className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10"><Outlet /></div>
    </div>
  </div>;
}
