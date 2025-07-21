import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Plus, Search, Filter, Download } from 'lucide-react'

export function Papers() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Papers</h2>
          <p className="text-gray-600">Your research paper collection</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Paper
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search papers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Papers List */}
      <div className="space-y-4">
        {/* Placeholder papers */}
        {[
          {
            title: 'Attention Is All You Need',
            authors: 'Vaswani et al.',
            journal: 'NIPS 2017',
            abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks...',
            tags: ['Transformers', 'NLP', 'Deep Learning'],
            added: '3 days ago',
          },
          {
            title: 'BERT: Pre-training of Deep Bidirectional Transformers',
            authors: 'Devlin et al.',
            journal: 'NAACL 2019',
            abstract: 'We introduce a new language representation model called BERT, which stands for Bidirectional Encoder...',
            tags: ['BERT', 'NLP', 'Pre-training'],
            added: '1 week ago',
          },
          {
            title: 'GPT-3: Language Models are Few-Shot Learners',
            authors: 'Brown et al.',
            journal: 'NeurIPS 2020',
            abstract: 'Recent work has demonstrated substantial gains on many NLP tasks and benchmarks by pre-training...',
            tags: ['GPT', 'Language Models', 'Few-shot Learning'],
            added: '2 weeks ago',
          },
        ].map((paper, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{paper.title}</CardTitle>
                  <CardDescription className="mb-2">
                    {paper.authors} • {paper.journal}
                  </CardDescription>
                  <p className="text-sm text-gray-600 line-clamp-2">{paper.abstract}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">Added {paper.added}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}